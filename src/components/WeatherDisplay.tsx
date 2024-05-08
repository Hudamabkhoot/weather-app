import React from 'react';
import { useDispatch } from 'react-redux';
import { CurrentWeather, City } from '../interfaces/weather.interfaces';
import styles from '../css-modules/WeatherDisplay.module.css';
import Add from '../assets/add.svg';
import { addCity } from '../slices/citiesSlice';
import { useAppSelector } from '../app/hooks';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

interface Weather {
  weatherData: CurrentWeather;
}

const WeatherDisplay: React.FC<Weather> = ({ weatherData }) => {
  const savedCities: City[] = useAppSelector((state) => state.cities.citiesList);    
  const { location, forecast } = weatherData
  const { condition, temp_c } = weatherData.current
  const dispatch = useDispatch()

  const handleAddCity = () => {
    const isCityExists = savedCities.some((savedCity: City) => savedCity.name === location.name);
    if (!isCityExists) {
      const cityData = {
        name: location.name,
        temp_c: temp_c,
        condition: condition.text,
        icon: condition.icon,
        id: uuidv4(),
      };
      dispatch(addCity(cityData));
      toast.success('City added successfully!!', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } else {
      toast.error('City already exists in the list.');
    }
  };

  return (  
      <>
      { weatherData &&
        <div className={styles.weather}>
      <h1>{location.name}</h1>
        <div className={styles.weatherTemp}>
          <img src={condition.icon} alt="Weather Icon" className={styles.icon} />
          <h1>{temp_c.toFixed(0)}</h1>
          <span className={styles.celsius}>°</span>
          <button 
          className={styles.addIconBtn}
          onClick={handleAddCity}
          >
            <img src={Add} alt="Weather Icon" className={styles.addIcon} />
          </button>
        </div>
        <h3>{condition.text}</h3>
        <div className={styles.weatherLowHigh}>

          <div className={styles.maxMinContainer}>
            <p className={styles.maxMin}>H:</p>
            <p>{forecast.forecastday[0].day.maxtemp_c.toFixed(0)}</p>
            <span>°</span>
          </div>
          <div className={styles.maxMinContainer}>
            <p className={styles.maxMin}>L:</p>
            <p>{forecast.forecastday[0].day.mintemp_c.toFixed(0)}</p>
            <span>°</span>
          </div>

        </div>
      </div>
      }
      </>
  );
};

export default WeatherDisplay;
