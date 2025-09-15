import React from "react";

const WeatherCard = ({ weather }) => {
  const { city } = weather;
  const temperature = 20;
  const wind = 10;
  const humidity = 60;
  const description = "Moderate Rain";
  const icon = "img/clear@4x.png";
  const date = "2025-09-15";
  console.log(city);
  return (
    <div className="weather-card">
      <div className="card-layout">
        <div className="weather-left">
          <div>
            <h2>{city}</h2>
            <p>{date}</p>
          </div>
          <h2 className="temperature">{temperature}°C</h2>
        </div>
        <div className="weather-right">
          <div className="flex flex-col items-center gap-3">
            <img src={icon} className="w-20 h-20" alt={description}/>
            <h3 className="text-2xl">{description}</h3>
          </div>
          <div className="flex flex-col md:flex-row lg:flex-row gap-2 md:gap-2 lg:gap-10">
            <p>Wind: {wind}km/h</p>
            <p>Humidity: {humidity}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
