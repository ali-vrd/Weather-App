import React, { useState, useEffect } from "react";
import './styles/weather.css';
import { FiCloud } from "react-icons/fi";
import { FiSun } from "react-icons/fi";
import { FiThermometer } from "react-icons/fi";
import { WiHumidity } from "react-icons/wi";
import { BsCloudRainHeavyFill } from "react-icons/bs";


function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [notFound, setNotFound] = useState(false);
  const apiKey = "9ba7a8713eb77e867cf2362505522f41";

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const getWeather = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    const data = await response.json();
    if (data.cod === "404") {
      setNotFound(true);
    } else {
      setWeather(data);
      setNotFound(false);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  const getWeatherIcon = () => {
    const weatherType = weather.weather && weather.weather[0].main;
    switch (weatherType) {
      case "Clouds":
        return <FiCloud size={50}/>;
      case "Clear":
        return <FiSun size={50}/>;
      case "Rain":
        return <BsCloudRainHeavyFill />;
      case "Smoke":
        return <FiCloud size={50}/>;
      case "Haze":
        return <FiCloud size={50}/>;
      case "Mist":
        return <FiCloud size={50}/>;
      case "Snow":
        return <BsCloudSnow size={50}/>;
      case "Thunderstorm":
        return <BsCloudLightningRainFill size={50}/>;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        onChange={handleInputChange}
      />
      <button onClick={getWeather}>Get Weather</button>
      {notFound ? (
        <p>City not found.</p>
      ) : weather.main ? (
        <div>
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <h3>{getWeatherIcon()}</h3>
          <p>{weather.weather[0].description}</p>
          <p>
            <FiThermometer/> Temperature:{" "}
            {(weather.main.temp - 273.15).toFixed(1)}°C
          </p>
          <p>
            <FiThermometer /> Feels like:{" "}
            {(weather.main.feels_like - 273.15).toFixed(1)}°C
          </p>
          <p>
            <WiHumidity size={20}/> Humidity: {weather.main.humidity}%
          </p>
        </div>
      ) : (
        <p>Enter a city name to get weather information.</p>
      )}
    </div>
  );
}

export default WeatherApp;


