import React, { Component } from 'react';
import axios from 'axios';

class WeatherForm extends Component {
  state = {
    location: '',
    suggestions: [],
  };

  handleChange = async (event) => {
    const input = event.target.value;
    this.setState({ location: input });

    // Fetch suggestions from Google Places API if input length is greater than 2
    if (input.length > 2) {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
          {
            params: {
              input,
              types: '(cities)',
              key: process.env.REACT_APP_GOOGLE_PLACES_API_KEY, // Your Google API Key here
            },
          }
        );

        if (response.data.status === 'OK') {
          this.setState({ suggestions: response.data.predictions });
        } else {
          this.setState({ suggestions: [] });
        }
      } catch (error) {
        console.error('Error fetching location suggestions:', error);
        this.setState({ suggestions: [] });
      }
    } else {
      this.setState({ suggestions: [] });
    }
  };

  handleSelect = (suggestion) => {
    this.setState({ location: suggestion.description, suggestions: [] });
    this.props.onSubmit(suggestion.description);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.location);
  };

  render() {
    return (
      <div className="weather-app-container">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Enter city, town, or village"
            value={this.state.location}
            onChange={this.handleChange}
          />
          <button type="submit">Get Weather</button>
        </form>

        {this.state.suggestions.length > 0 && (
          <ul className="suggestions">
            {this.state.suggestions.map((suggestion) => (
              <li
                key={suggestion.place_id}
                onClick={() => this.handleSelect(suggestion)}
              >
                {suggestion.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default WeatherForm;
