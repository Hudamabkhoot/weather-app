import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../app/hooks';
import { setUserLocation } from '../slices/citiesSlice';
import { CurrentWeather } from '../interfaces/weather.interfaces';
import { 
  getWeatherByCityName,
  getCurrentCoordinates, 
  getWeatherByCoordinates 
} from "../utils/WeatherApi";
import { startDataRefresh } from '../utils/weatherDataRefresh';
import { convertTo12HourFormat } from '../utils/helpers';
import WeatherMain from '../components/WeatherMain';
import { Toaster } from 'react-hot-toast';
import Search from '../components/Search';
import SavedCities from '../components/SavedCities';
import Navbar from '../components/Navbar';
import Start from '../components/Start';
import { RotatingLines } from 'react-loader-spinner';

const Home = () => {
  const dispatch = useDispatch();
  const userLocation = useAppSelector((state) => state.cities.userLocation);
  const [weatherData, setWeatherData] = useState<CurrentWeather | null>(null);
  const [cityName, setCityName] = useState<string>('');
  const [localTime, setLocalTime] = useState<string>('')
  const [showSavedCities, setShowSavedCities] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  

  useEffect(() => {
    startDataRefresh();
  }, []);

  useEffect(() => {
    const fetchUserLocationData = async () => {
      const { latitude, longitude } = userLocation;
      if (latitude && longitude) {
        await handleGetCoordinates(latitude, longitude);
      }
    };
    fetchUserLocationData();
  }, [userLocation]);

  const fetchCityData = async () => {
    try {
      setIsLoading(true);
      const data = await getWeatherByCityName(cityName);
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setIsLoading(false);
      setCityName('');
    }
  };

  const handleSearch = () => {
    fetchCityData();
  };

  const getLocation = async () => {
    const { latitude, longitude } = userLocation;
    if (!latitude && !longitude) {
    try {
      const position = await getCurrentCoordinates();
      const { latitude, longitude } = position.coords;
      dispatch(setUserLocation({ latitude, longitude }));
      await handleGetCoordinates(latitude, longitude);
    } catch (error) {
      console.error("Error getting user location: ", error);
    }
  }
  };

  const handleGetCoordinates = async (latitude: number, longitude: number) => {
    await getWeatherByCoordinates(latitude, longitude, setWeatherData, setIsLoading);
  };

  useEffect(() => {
    if (weatherData?.forecast) {
      const time = weatherData.location.localtime.slice(11);
      const formattedTimeIn12 = convertTo12HourFormat(time);
      setLocalTime(formattedTimeIn12);
    }
  }, [weatherData]);

  const handleModal = () => {
    setShowSavedCities(true);
  };

  return (
    <div>
      <Navbar handleModal={handleModal} />
      <div className={'main-container'}>
        <Search
          cityName={cityName}
          setCityName={setCityName}
          handleSearch={handleSearch}
          getLocation={getLocation}
        />
        {isLoading ? (
          <div className='start'>
            <RotatingLines
              strokeColor="rgba(0, 0, 0, 0.7)"
              strokeWidth="4"
              animationDuration="3"
              width="60"
              visible={true}
            />
          </div>
        ) : weatherData ? (
          <div>
            <WeatherMain
              weatherData={weatherData}
              localTime={localTime}
            />
            {showSavedCities &&
              <SavedCities
                setModalOpen={setShowSavedCities}
                modalOpen={showSavedCities}
                setWeatherData={setWeatherData}
              />
            }
          </div>
        ) : (
          <Start />
        )}
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
};

export default Home;