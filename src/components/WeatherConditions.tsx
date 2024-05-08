import React from 'react';
import { CurrentWeather } from '../interfaces/weather.interfaces';
import styles from '../css-modules/WeatherConditions.module.css';
import WeatherBox  from './WeatherBox'

interface Weather {
    weatherData: CurrentWeather;
}

const WeatherConditions: React.FC<Weather> = ({ weatherData }) => {

    return (
        <div className={styles.conditions}>
            <div className={styles.boxes}>
                <WeatherBox
                        title="Wind"
                        imageUrl="https://basmilius.github.io/weather-icons/production/fill/all/compass.svg" 
                        content={
                            <div className={styles.condition}>
                            <p>{weatherData.current.wind_dir}</p>
                            </div>}
                 />
                <WeatherBox
                    title="Humidity"
                    imageUrl="https://basmilius.github.io/weather-icons/production/fill/all/humidity.svg" 
                    content={
                        <div className={styles.condition}>
                            <p>{weatherData.forecast.forecastday[0].day.avghumidity}%</p>
                        </div>
                    }
                />
                <WeatherBox
                    title="Feels Like"
                    imageUrl="https://basmilius.github.io/weather-icons/production/fill/all/thermometer.svg" 
                    content={
                        <div className={styles.condition}>
                            <p>{weatherData.current.feelslike_c.toFixed(0)}</p>
                            <span>°</span>
                        </div>}
                />
                <WeatherBox
                    title="UV Index"
                    imageUrl="https://basmilius.github.io/weather-icons/production/fill/all/uv-index.svg" 
                    content={
                        <div className={styles.condition}>
                            <p>{weatherData.forecast.forecastday[0].day.uv}</p>
                        </div>
                    }
                />
                <WeatherBox
                    title="Sunset"
                    imageUrl="https://basmilius.github.io/weather-icons/production/fill/all/sunset.svg" 
                    content={
                        <div className={styles.condition}>
                            <p>{weatherData.forecast.forecastday[0].astro.sunset.slice(1,8)}</p>
                        </div>}
                />
               <WeatherBox
                    title="Sunrise"
                    imageUrl="https://basmilius.github.io/weather-icons/production/fill/all/sunrise.svg" 
                    content={
                        <div className={styles.condition}>
                            <p>{weatherData.forecast.forecastday[0].astro.sunrise.slice(1,8)}</p>
                        </div>}
                />
                <WeatherBox
                    title="Wind"
                    imageUrl="https://basmilius.github.io/weather-icons/production/fill/all/windsock.svg" 
                    content={
                            <div className={styles.condition}>
                            <p>{(weatherData.current.wind_kph).toFixed(0)}</p>
                            <div className={styles.side}>
                                <p>km/h</p>
                            </div>
                            </div>
                    }
                />
                <WeatherBox
                    title="Wind Gusts"
                    imageUrl="https://basmilius.github.io/weather-icons/production/fill/all/wind.svg" 
                    content={
                        <div className={styles.condition}>
                        <p>{weatherData.current.gust_kph.toFixed(0)}</p>
                        <div className={styles.side}>
                                <p>km/h</p>
                        </div>
                        </div>}
                />
                <WeatherBox
                    title="Visibility"
                    imageUrl="https://basmilius.github.io/weather-icons/production/fill/all/fog.svg" 
                    content={
                        <div className={styles.condition}>
                        <p>{(weatherData.forecast.forecastday[0].day.avgvis_km).toFixed(0)}</p>
                        <div className={styles.side}>
                                <p>km/h</p>
                        </div>
                        </div>}
                />
                <WeatherBox
                    title="Moon Phase"
                    imageUrl="https://basmilius.github.io/weather-icons/production/fill/all/falling-stars.svg" 
                    content={
                        <div className={styles.condition}>
                            <p>{weatherData.forecast.forecastday[0].astro.moon_phase}</p>
                        </div>}
                />
                 <WeatherBox
                    title="Dew point"
                    imageUrl="https://basmilius.github.io/weather-icons/production/fill/all/raindrop.svg" 
                    content={
                        <div className={styles.condition}>
                            <p>{weatherData.forecast.forecastday[0].hour[0].dewpoint_c.toFixed(0)}</p>
                            <div className={styles.side}>
                            <span>°</span>
                        </div>
                        </div>}
                />
                <WeatherBox
                    title="Pressure"
                    imageUrl="https://basmilius.github.io/weather-icons/production/fill/all/barometer.svg" 
                    content={
                        <div className={styles.condition}>
                        <p>{weatherData.current.pressure_mb}</p>
                        <div className={styles.side}>
                                <p>hPa</p>
                        </div>
                        </div>
                        }
                />
            </div>
        </div>
    );
};

export default WeatherConditions;
