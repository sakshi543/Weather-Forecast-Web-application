// WeatherDisplay.js

import React from 'react';
import './WeatherDisplay.css';

const CurrentWeather = ({ weatherData }) => {
  return (

    <div className="current-weather">
      <h3>Current Weather in {weatherData.name}</h3>
      <p>Temperature: {weatherData.main.temp} °C</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Description: {weatherData.weather[0].description}</p>
    </div>
  );
};

const Forecast = ({ forecastData }) => {
  return (
    <div className="forecast-container">
      <h3>Weather Forecast for the next 5 days:</h3>
      {forecastData.map((item, index) => (
        <div key={index} className="forecast-item">
          <p>Date: {item.dt_txt}</p>
          <p>Temperature: {item.main.temp} °C</p>
          <p>Description: {item.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
};

const WeatherDisplay = ({ weatherData, forecastData }) => {

    return (
    <div className="weather-display">
      {weatherData && <CurrentWeather weatherData={weatherData} />}
      {forecastData && forecastData.length > 0 && <Forecast forecastData={forecastData} />}
    </div>
  );
};
export default WeatherDisplay;
