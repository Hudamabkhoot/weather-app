// WeatherDisplay.tsx
import React, { useState, useEffect } from 'react';
import { Temperature, CurrentWeather} from '../interfaces/weather.interfaces';
import styles from '../css-modules/HourlyForecastDisplay.module.css'; 
import { temperatureTime, convertTo12HourFormat } from "../utils/helpers";

interface Weather {
  weatherData: CurrentWeather; 
  localTime: string;
}

const HourlyForecastDisplay: React.FC<Weather> = ({ weatherData, localTime }) => {
  const [hourlyTemperatures, setHourlyTemperatures] = useState<Temperature[]>([]);
  
  useEffect(() => {
    const fetchHourlyData = () => {
      if (weatherData?.forecast && localTime) {
        const formattedLocalTime = temperatureTime(localTime);
        let tempArray: Temperature[] = [];
    
        for (const forecastDay of weatherData.forecast.forecastday) {
          for (const hour of forecastDay.hour) {
            const findHour = hour.time.slice(11);
            
            if (findHour === formattedLocalTime || tempArray.length > 0) {
              const formattedHour = convertTo12HourFormat(findHour);
              const temperatureString = hour.temp_c.toFixed(0).toString();
              
              const temp: Temperature = {
                hour: findHour === formattedLocalTime ? 'Now' : formattedHour,
                temp_c: temperatureString,
                icon: hour.condition.icon
              };
              
              tempArray.push(temp);
              if (tempArray.length === 24) break;
            }
          }
          if (tempArray.length === 24) break;
        }
  
        setHourlyTemperatures(tempArray);
      }
    };
  
    fetchHourlyData();
  }, [weatherData, localTime]);

  return (
    <div>
    {hourlyTemperatures.length !== 0 ? (
    <div className={styles.dayForcastDisplay}> 
      {hourlyTemperatures.map(temperature => (
        <div key={temperature.hour} className={styles.dayForcast}> 
          <p>{temperature.hour}</p>
          <img src={temperature.icon} alt="Weather Icon" />
          <div className={styles.temp}>
          <p>{temperature.temp_c}</p>
          <span>°</span>
          </div>
        </div>
      ))}
    </div>
    ) : (
      <p className='no-data'>
        <img 
        src='https://basmilius.github.io/weather-icons/production/fill/all/horizon.svg' 
      className='icon'/> No hourly forecast available at the moment</p>
    )}
    </div>
  );
};

export default HourlyForecastDisplay;
