import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/api/weather", async (req, res) => {
  try {
    const { query } = req.query;
    let url;
    let locationsData = [];
    if (query) {
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=8&language=en&format=json`;

      const geoResp = await fetch(geoUrl);
      if (!geoResp.ok) throw new Error(`Geocoding failed${geoResp.status}`);
      const geoData = await geoResp.json();

      if (!geoData.results || geoData.results.length === 0) {
        return res.status(404).json({ message: "No matching locations found" });
      }

      locationsData = geoData.results.map((r) => ({
        id: r.id,
        name: r.name,
        country_code: r.country_code,
      }));

      const latitudes = geoData.results.map((r) => r.latitude).join(",");
      const longitudes = geoData.results.map((r) => r.longitude).join(",");

      url = `https://api.open-meteo.com/v1/forecast?latitude=${latitudes}&longitude=${longitudes}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;
    } else {
      url =
        "https://api.open-meteo.com/v1/forecast?latitude=48.1482,48.2085,47.4984,50.0880&longitude=17.1067,16.3721,19.0404,14.4208&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code";
      locationsData = [
        {
          id: "0",
          name: "Bratislava",
          country_code: "SK",
        },
        {
          id: "2",
          name: "Vienna",
          country_code: "AT",
        },
        {
          id: "3",
          name: "Budapest",
          country_code: "HU",
        },
        {
          id: "4",
          name: "Prague",
          country_code: "CZ",
        },
      ];
    }
    const weather = await fetch(url);
    const weatherData = await weather.json();
    res.json({
      locations: locationsData,
      weather: weatherData,
    });
  } catch (err) {
    console.error(`Error fetching weather: ${err}`);
    res.status(500).json({ err: "Server error fetching weather" });
  }
});

app.get("/api/forecast", async (req, res) => {
  const latitude = req.query.latitude || {};
  const longitude = req.query.longitude || {};
  try {
    const forecast = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`
    );
    if (!forecast.ok) throw new Error(`Open-Meteo HTTP ${forecast.status}`);
    const data = await forecast.json();
    res.json(data);
  } catch (err) {
    console.error(`Error fetching forecast: ${err}`);
    res.status(500).json({ err: "Server error fetching forecast" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost${PORT}`);
});
