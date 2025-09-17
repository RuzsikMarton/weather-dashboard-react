import React, { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";
import { Link } from "react-router-dom";

const Home = () => {
  const [weatherInfo, setWeatherInfo] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const cities = ["Bratislava", "Vienna", "Budapest", "Prague"];

  const fetchWeather = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const res = await fetch("http://localhost:3000/api/weather");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      const labeled = data.map((item, i) => ({
        city: cities[i],
        ...item.current,
        latitude: item.latitude,
        longitude: item.longitude,
      }));
      setWeatherInfo(labeled);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setErrorMessage("Failed to fetch weather data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="wrapper">
      <div className="title">
        <h1 className="mb-3">Weather Dashboard</h1>
      </div>
      <div className="weather-list">
        {isLoading ? (
          <h2 className="text-sky-600">Loading...</h2>
        ) : errorMessage ? (
          <h2 className="text-red-500">{errorMessage}</h2>
        ) : (
          <ul>
            {weatherInfo.map((weather) => {
              return (
                <li key={weather.city}>
                  <Link to={`/forecast/${weather.latitude}/${weather.longitude}/${weather.city}`}>
                    <WeatherCard weather={weather} />
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
