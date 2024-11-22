import React, { Component } from 'react';
import WeatherForm from './components/WeatherForm';
import WeatherDisplay from './components/WeatherDisplay';
import axios from 'axios';
import './styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: null,
      error: null,
    };
  }

  fetchWeatherData = async (city) => {
    console.log('API Key:', process.env.REACT_APP_WEATHER_API_KEY); // Debug line
    try {
      const response = await axios.get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${city}`
      );
      if (response.data.error) {
        this.setState({ error: response.data.error.info, weatherData: null });
      } else {
        this.setState({ weatherData: response.data, error: null });
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      this.setState({ error: 'Failed to fetch weather data', weatherData: null });
    }
  };

  render() {
    return (
      <div className="App">
        <h1 className='text-center'>WeatherDisplay</h1>
        <WeatherForm onSubmit={this.fetchWeatherData} />
        {this.state.error && <p style={{ color: 'red' }}>{this.state.error}</p>}
        <WeatherDisplay weatherData={this.state.weatherData} />
      </div>
    );
  }
}

export default App;
