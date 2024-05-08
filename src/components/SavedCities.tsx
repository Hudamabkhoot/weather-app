import { useDispatch } from 'react-redux';
import { useAppSelector } from '../app/hooks';
import { deleteCity } from '../slices/citiesSlice'; 
import { City, CurrentWeather } from '../interfaces/weather.interfaces';
import Remove from '../assets/remove.svg';
import styles from '../css-modules/SavedCities.module.css';
import {AnimatePresence, motion } from 'framer-motion';
import { MdOutlineClose } from 'react-icons/md';
import { getWeatherByCityName } from '../utils/WeatherApi'; 
import { Dispatch, SetStateAction } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addCity } from '../slices/citiesSlice'; 
import toast from 'react-hot-toast';

const dropIn = {
    hidden: {
      opacity: 0,
      transform: 'scale(0.9)',
    },
    visible: {
      transform: 'scale(1)',
      opacity: 1,
      transition: {
        duration: 0.1,
        type: 'spring',
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      transform: 'scale(0.9)',
      opacity: 0,
    },
  };


 export interface SavedCity {
    modalOpen: boolean;
    setModalOpen: (isOpen: boolean) => void;
    setWeatherData: Dispatch<SetStateAction<CurrentWeather | null>>; // Adjust the type here
  }  


const SavedCities: React.FC<SavedCity> = ({modalOpen, setModalOpen, setWeatherData}) => {
    const savedCities: City[] = useAppSelector((state) => state.cities.citiesList);    
    const dispatch = useDispatch();

  const handleDeleteCity = (weather: City) => {
    dispatch(deleteCity(weather.id));
    toast.success('City removed successfully!!', {style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    }},)
  };

  const handleCityWeather = async (city: City) => {    
      try {
        const cityWeatherDataPromise = getWeatherByCityName(city.name);

        toast.promise(cityWeatherDataPromise, {
            loading: 'Loading weather for saved city...',
            success: 'Weather data retrieved successfully!',
            error: 'Error fetching weather data',
        }, {
          icon: '☀️',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          }
        })

        const cityWeatherData = await cityWeatherDataPromise;
          if (cityWeatherData) {
            setWeatherData(cityWeatherData);
            const cityData = {
              name: cityWeatherData.location.name,
              temp_c: cityWeatherData.current.temp_c,
              condition: cityWeatherData.current.condition.text,
              icon: cityWeatherData.current.condition.icon,
              id:  uuidv4(),
          };
          dispatch(addCity(cityData));
          } 
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
    setModalOpen(false);
};

  return (
    <AnimatePresence>
     {modalOpen && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.container}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={styles.closeButton}
              onKeyDown={() => setModalOpen(false)}
              onClick={() => setModalOpen(false)}
              role="button"
              tabIndex={0}
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose />
            </motion.div> 
         {savedCities.length > 0 ?
         <div className={styles.weatherContainer}>
          {savedCities.map((city, index) => (
            <div
              key={index}
              id={city.id}
              className={styles.weather}
            >
              <div 
              onClick={() => handleCityWeather(city)}
              className={styles.weather}
              >
              <div 
              className={styles.weatherLeft}
              >
                <h3>{city.name}</h3>
                <p>{city.condition}</p>
              </div>
              <div 
              className={styles.weatherMiddle}
              >
                <img src={city.icon} alt="Weather Icon" className={styles.icon} />
                <h3>{city.temp_c.toFixed(0)}</h3>
                <span>°</span>
               </div>
              </div>
              <button
                onClick={() => handleDeleteCity(city)}
                className={styles.addIconBtn}
              >
                <img src={Remove} alt="Weather Icon" className={styles.addIcon} />
              </button>
            </div>
          ))
         } 
         </div> 
         :  <p className='no-data'>
          <img 
          src='https://basmilius.github.io/weather-icons/production/fill/all/horizon.svg' 
         className='icon'
         /> You don't have any saved cities</p>}
        </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
  );
};

export default SavedCities;
