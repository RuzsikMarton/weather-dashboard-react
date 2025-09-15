import React, { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";

const Home = () => {
  const [weatherInfo, setWeatherInfo] = useState([{}, {}, {}, {}]);

  const cities = ["Bratislava", "Vienna", "Budapest", "Prague"];
  const labeled = weatherInfo.map((item, i) => ({ city: cities[i] }));

  useEffect(() => {
    setWeatherInfo(labeled);
  }, []);

  return (
    <div className="wrapper">
      <div className="title">
        <h1>Weather Dashboard</h1>
      </div>
      <div className="weather-list">
        <ul>
          {weatherInfo.map((weather) => {
            return <WeatherCard key={weather.city} weather={weather} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
