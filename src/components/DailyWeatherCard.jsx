import React from "react";
import { wmoCode } from "../assets/utils";

const DailyWeatherCard = ({
  dailyWeather: { temperature_2m_max, temperature_2m_min, time, weather_code },
}) => {
  const dateStr = time[0];
  const date = new Date(dateStr);
  const day = date.toLocaleDateString("en-US", { weekday: "long" });

  console.log(day);
  return (
    <div className="daily-card">
      <h3>7-day forecast</h3>
      <ul>
        {time.map((date, i) => {
          const isFirst = i === 0;
          const maxtemp = temperature_2m_max[i];
          const mintemp = temperature_2m_min[i];
          const { description, icon } = wmoCode(weather_code[i]);
          const day = new Date(date).toLocaleDateString("en-US", {
            weekday: "short",
          });

          return (
            <li className={`daily-row ${isFirst ? "border-t border-gray-700" : ""}`} key={date}>
              <p>{day}</p>
              <img src={icon} className="w-15 h-15 mx-auto" alt={description} />
              <span className="text-gray-400">Min: {mintemp.toFixed()}°C</span>
              <span>Max: {maxtemp.toFixed()}°C</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DailyWeatherCard;
