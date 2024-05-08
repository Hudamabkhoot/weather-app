import React, {useEffect, useState } from 'react';
import { DailyTemperature, CurrentWeather } from '../interfaces/weather.interfaces';
import { getDayByDate } from '../utils/helpers'; 
import styles from '../css-modules/DailyForecastDisplay.module.css'; 
import calendar  from '../assets/calendar.svg';

interface Weather {
  weatherData: CurrentWeather; 
  localTime: string;
}

const DailyForecastDisplay: React.FC<Weather> = ({ weatherData, localTime  }) => {
  const [dailyTemperatures, setDailyTemperatures] = useState<DailyTemperature[]>([]);

  useEffect(() => {
    if (weatherData?.forecast && localTime) {
      const tempArray: DailyTemperature[] = [];
      const forecastDays = weatherData.forecast.forecastday.slice(1);
      forecastDays.forEach(hour => {
        const day = getDayByDate(hour.date).slice(0, 3);
        const temp = {
          day,
          maxtemp_c: parseFloat(hour.day.maxtemp_c.toFixed(0)),
          mintemp_c: parseFloat(hour.day.mintemp_c.toFixed(0)),
          icon: hour.day.condition.icon,
        };
        tempArray.push(temp);
      });
      setDailyTemperatures(tempArray);
    }
  }, [weatherData, localTime]);

  return (
    <div className={styles.dayForcastDisplay}>
      <p className={styles.title}> 
        <img src={calendar} alt="Weather Icon" className={styles.icon} />
        7-DAY FORECAST
      </p>
      <div>
        {dailyTemperatures.length !== 0 ? (
          dailyTemperatures.map(temperature => (
            <div key={temperature.day} className={styles.dayForcast}> 
              <p>{temperature.day}</p>
              <img src={temperature.icon} alt="Weather Icon" />
              <div className={styles.temperature}>
                <p>{temperature.maxtemp_c}</p>
                <span>°</span>
              </div>
              <div className={styles.temperature}>
                <p>{temperature.mintemp_c}</p>
                <span>°</span>
              </div>
            </div>
          ))
        ) : (
          <p className='no-data'>
            <img src='https://basmilius.github.io/weather-icons/production/fill/all/horizon.svg' className='icon'/>
            No daily forecast available at the moment
          </p>
        )}
      </div>  
    </div>
  );
};

export default DailyForecastDisplay;
