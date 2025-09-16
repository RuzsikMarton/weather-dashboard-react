import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Forecast = () => {
  const { latitude, longitude, city } = useParams();
  const navigate = useNavigate();

  const [currentWeather, setCurrentWeather] = useState(null);
  const [dailyWeather, setDailyWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    if (!latitude || !longitude) {
      navigate("/", { replace: true });
      return;
    }
    fetchForecast();
  }, []);

  return (
    <div>
      {isLoading ? (
        <h2 className="text-sky-600">Loading...</h2>
      ) : errorMessage ? (
        <h2 className="text-red-500">{errorMessage}</h2>
      ) : (
        <div>
          <h1>{city}</h1>
          <div>Current weather</div>
          <div>Forecast</div>
        </div>
      )}
    </div>
  );
};

export default Forecast;
