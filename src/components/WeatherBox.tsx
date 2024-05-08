import React from 'react';
import styles from '../css-modules/WeatherConditions.module.css';

interface WeatherBoxProps {
    title: string;
    content: React.ReactNode;
    imageUrl: string;
}

const WeatherBox: React.FC<WeatherBoxProps> = ({ title, content, imageUrl }) => (
    <div className={styles.weatherBoxes}>
    <h2 className={styles.title}> 
    {imageUrl && <img src={imageUrl} alt="Weather" className='icon' />}{title}
    </h2>
        {content}
    </div>
);

export default WeatherBox;
