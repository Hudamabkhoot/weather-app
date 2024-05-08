import React from 'react';
import { CurrentWeather } from "../interfaces/weather.interfaces";
import HourlyForecastDisplay from '../components/HourlyForecastDisplay'; 
import DailyForecastDisplay from '../components/DailyForecastDisplay'; 
import WeatherDisplay from '../components/WeatherDisplay'; 
import WeatherConditions from '../components/WeatherConditions'; 

interface WeatherComponentProps {
  weatherData: CurrentWeather;
  localTime: string;
}

const WeatherMain: React.FC<WeatherComponentProps> = ({ weatherData, localTime }) => {

  return (
    <div>
      <WeatherDisplay weatherData={weatherData}/>
      <HourlyForecastDisplay localTime={localTime} weatherData={weatherData}/> 
      <DailyForecastDisplay localTime={localTime} weatherData={weatherData}/> 
      <WeatherConditions weatherData={weatherData} />
    </div>
  );
};

export default WeatherMain;