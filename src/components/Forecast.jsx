import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { wmoCode } from "../assets/utils";
import WeatherCard from "./WeatherCard";
import DailyWeatherCard from "./DailyWeatherCard";

const Forecast = () => {
  const { latitude, longitude, city } = useParams();
  const navigate = useNavigate();

  const [currentWeather, setCurrentWeather] = useState(null);
  const [dailyWeather, setDailyWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const wmo = currentWeather
    ? wmoCode(currentWeather.weather_code)
    : { description: "...", icon: "" };

  const fetchForecast = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const res = await fetch(
        `http://localhost:3000/api/forecast?latitude=${latitude}&longitude=${longitude}`
      );
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      setCurrentWeather(data.current);
      setDailyWeather(data.daily);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
      setErrorMessage("Failed to fetch forecast data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const latN = Number(latitude);
    const lonN = Number(longitude);
    if (!Number.isFinite(latN) || !Number.isFinite(lonN)) {
      navigate("/", { replace: true });
      return;
    }
    fetchForecast();
  }, [latitude, longitude, navigate]);

  return (
    <div className="wrapper flex flex-col">
      <h1 className="mb-5">{city}</h1>
      {isLoading ? (
        <h2 className="text-sky-600">Loading...</h2>
      ) : errorMessage ? (
        <h2 className="text-red-500">{errorMessage}</h2>
      ) : !isLoading && !errorMessage && currentWeather ? (
        <div className="grid grid-rows-[auto-auto] gap-5">
          <WeatherCard weather={currentWeather}></WeatherCard>
          <DailyWeatherCard dailyWeather={dailyWeather} />
        </div>
      ) : null}
    </div>
  );
};

export default Forecast;
