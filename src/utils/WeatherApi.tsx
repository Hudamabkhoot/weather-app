import axios from 'axios';
import { CurrentWeather } from "../interfaces/weather.interfaces";

const WeatherApiKey = import.meta.env.VITE_WEATHER_API_KEY
const GeoApiKey = import.meta.env.VITE_GEOAPIFY_API_KEY

export async function getWeatherByCityName(cityName: string): Promise<CurrentWeather> {
  try {
      const response = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=${WeatherApiKey}&q=${cityName}&days=7`
      );

      if (!response.data) {
          throw new Error(`Weather data not available for ${cityName}`);
      }

      return response.data as CurrentWeather;
      
  } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
  }
}

export const getCurrentCoordinates = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
              (position) => {
                  resolve(position);
              },
              (error) => {
                  reject(error);
              }
          );
      } else {
          reject(new Error("Geolocation is not supported"));
      }
  });
};

export const getWeatherByCoordinates = async (latitude: number, longitude: number, setWeatherData: Function, setIsLoading: Function) => {
  setIsLoading(true); 
  try {
      const res = await axios.get(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${GeoApiKey}`
      );
      const city = res.data.features[0].properties.city;
      const weatherData = await getWeatherByCityName(city);
      if (weatherData) {
          setWeatherData(weatherData);
      }
  } catch (error) {
      console.error("Error getting coordinates: ", error);
  }
  finally {
      setIsLoading(false); 
  }
};