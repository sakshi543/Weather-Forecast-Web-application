// WeatherForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import weatherAPIConfig from './weatherAPIConfig';
import './WeatherForm.css';
import './WeatherDisplay.css';
import WeatherDisplay from './WeatherDisplay';

const WeatherForm = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [error, setError] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [currentForecastData, setCurrentForecastData] = useState([]);

  // Function to fetch weather data based on coordinates
  const fetchWeatherDataByCoords = async (latitude, longitude) => {
    try {
      const response = await axios.get(`${weatherAPIConfig.base}weather?lat=${latitude}&lon=${longitude}&appid=${weatherAPIConfig.key}`);
      const forecastResponse = await axios.get(`${weatherAPIConfig.base}forecast?lat=${latitude}&lon=${longitude}&appid=${weatherAPIConfig.key}`);
      const nextFiveDays = forecastResponse.data.list.filter(item => {
        const date = new Date(item.dt_txt);
        return date.getHours() === 12; // Filter for forecasts at 12:00 PM for each day
      });
      setCurrentWeatherData(response.data);
      setCurrentForecastData(nextFiveDays);
      setError('');
    } catch (error) {
      console.error('Error fetching current weather data:', error);
      setError('Error fetching current weather data. Please try again.');
    }
  };

  useEffect(() => {
    // Fetch weather data based on user's location when component mounts
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        fetchWeatherDataByCoords(latitude, longitude);
      }, error => {
        console.error('Error getting user location:', error);
        setError('Error getting user location. Please enter a city name.');
      });
    } else {
      setError('Geolocation is not supported by this browser. Please enter a city name.');
    }
  }, []); // Empty dependency array to ensure effect runs only once

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${weatherAPIConfig.base}weather?q=${searchLocation}&appid=${weatherAPIConfig.key}`);
      const forecastResponse = await axios.get(`${weatherAPIConfig.base}forecast?q=${searchLocation}&appid=${weatherAPIConfig.key}`);
      
      const nextFiveDays = forecastResponse.data.list.filter(item => {
        const date = new Date(item.dt_txt);
        return date.getHours() === 12; // Filter for forecasts at 12:00 PM for each day
      });
  
      setWeatherData(response.data);
      setForecastData(nextFiveDays);
      setError('');
    } catch (error) {
      console.error('Error fetching weather data for searched location:', error);
      setError('Error fetching weather data. Please try again.');
    }
  };

  return (
    <div className="weather-container">
      <div className="weather-section">
        <div className="current-location-weather">
          <h2>Current Location</h2>
          {currentWeatherData && (
            <div className="weather-display">
              <WeatherDisplay weatherData={currentWeatherData} forecastData={currentForecastData} />
            </div>
          )}
        </div>
      </div>
      <div className="weather-section">
        <div className="searched-location-weather">
          <h2>Searched Location</h2>
          <form onSubmit={handleSearchSubmit} className="weather-form">
            <input
              type="text"
              placeholder="Enter city name"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
            <button type="submit">Search</button>
            {error && <p className="error-message">{error}</p>}
          </form>
          {weatherData && (
            <div className="weather-display">
              <WeatherDisplay weatherData={weatherData} forecastData={forecastData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherForm;
