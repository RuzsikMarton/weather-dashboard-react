import React from "react";
import { wmoCode } from "../assets/utils";

const WeatherCard = ({ weather: {relative_humidity_2m, name, country_code, temperature_2m, wind_speed_10m, weather_code, time} }) => {
  const { description, icon } = wmoCode(weather_code);
  return (
    <div className="weather-card">
      <div className="card-layout">
        <div className="weather-left">
          <div>
            <h2>{name && country_code ? `${name}, ${country_code}` : "Current Weather"}</h2>
            <p>{time}</p>
          </div>
          <h2 className="temperature">{temperature_2m.toFixed()}°C</h2>
        </div>
        <div className="weather-right">
          <div className="flex flex-col items-center gap-3">
            <img src={icon} className="w-20 h-20" alt={description}/>
            <h3 className="text-2xl">{description}</h3>
          </div>
          <div className="flex flex-col md:flex-row lg:flex-row gap-2 md:gap-2 lg:gap-10">
            <p>Wind: {wind_speed_10m}km/h</p>
            <p>Humidity: {relative_humidity_2m}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
