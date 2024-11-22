import React, { Component } from 'react';


class WeatherDisplay extends Component {
  render() {
    const { weatherData } = this.props;

    // Ensure the weatherData is correctly structured
    if (!weatherData || !weatherData.location || !weatherData.current) {
      return null;
    }

    return (
      <div className="weather-container">
        <h2>{weatherData.location.name}</h2>
        <p>Temperature: {weatherData.current.temperature}°C</p>
        <p>Condition: {weatherData.current.weather_descriptions[0]}</p>
        <p>Humidity: {weatherData.current.humidity}%</p>
        <p>Wind Speed: {weatherData.current.wind_speed} km/h</p>
        <p>Region: {weatherData.location.region}</p>
        <p>Country: {weatherData.location.country}</p>
      </div>
    );
  }
}

export default WeatherDisplay;
