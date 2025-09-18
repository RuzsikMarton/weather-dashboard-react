import React, { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";
import { Link } from "react-router-dom";
import Search from "./Search";
import { useDebounce } from "react-use";

const Home = () => {
  const [weatherInfo, setWeatherInfo] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm]);

  const fetchWeather = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const params = new URLSearchParams();
      if (query.trim()) params.set("query", query.trim());
      const res = await fetch(
        `http://localhost:3000/api/weather?${params.toString()}`
      );

      if (res.status === 404) {
      setWeatherInfo([]);
      setErrorMessage("No matching locations found.");
      return;
    }

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      let locs = data.locations ?? [];
      const weatherArray = [].concat(data.weather ?? []);
      let labeled = weatherArray.map((item, i) => ({
        id: locs[i].id,
        name: locs[i].name,
        country_code: locs[i].country_code,
        ...item.current,
        latitude: item.latitude,
        longitude: item.longitude,
      }));

      setWeatherInfo(labeled);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherInfo([]);
      setErrorMessage("Failed to fetch weather data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(searchTerm);
  }, [debouncedSearchTerm]);

  return (
    <div className="wrapper">
      <div className="title">
        <h1 className="mb-3">Weather Dashboard</h1>
      </div>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="weather-list">
        {isLoading ? (
          <h2 className="text-sky-600">Loading...</h2>
        ) : errorMessage ? (
          <h2 className="text-red-500">{errorMessage}</h2>
        ) : weatherInfo.length === 0 ? (
          <p className="text-gray-400">No results. Try another search.</p>
        ) : (
          <ul>
            {weatherInfo.map((weather) => {
              return (
                <li key={weather.id}>
                  <Link
                    to={`/forecast/${weather.latitude}/${weather.longitude}/${weather.name}`}
                  >
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
