import { getWeatherByCityName } from './WeatherApi';
import { City } from '../interfaces/weather.interfaces';


const refreshWeatherData = async (savedCities: City[]) => {
  try {
    const updatedCities = await Promise.all(savedCities.map(async (city: City) => {
      const data = await getWeatherByCityName(city.name); 
      return { ...city, ...data };
    }));

    localStorage.setItem('savedCities', JSON.stringify(updatedCities)); // Update local storage
  } catch (error) {
    console.error('Error refreshing weather data:', error);
  }
};

export const startDataRefresh = () => {
  setInterval(() => {
    const savedCities = JSON.parse(localStorage.getItem('savedCities') || '[]');
    refreshWeatherData(savedCities);
  }, 3600000);
};
