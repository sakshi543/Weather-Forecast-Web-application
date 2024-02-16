// App.js

import React, { useState } from 'react';
import WeatherForm from './WeatherForm';
import './App.css'; // Import the App.css file

const App = () => {
  const [setWeatherData] = useState(null);

  const handleWeatherData = (data) => {
    setWeatherData(data);
  };

  return (
    <div className="app-container"> {/* Apply the CSS class from App.css */}
      <div className='heading'>
        <h1>☼ Weather Forecast ☼</h1>
      </div>
      <WeatherForm onWeatherData={handleWeatherData} />
    </div>
  );
};

export default App;
