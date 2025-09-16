import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/api/weather", async (req, res) => {
  const url =
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=48.1482,48.2085,47.4984,50.0880" +
    "&longitude=17.1067,16.3721,19.0404,14.4208" +
    "&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code";
  try {
    const weather = await fetch(url);
    const data = await weather.json();
    res.json(data);
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
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}1&daily=weather_code,temperature_2m_max,temperature_2m_min&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`
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
