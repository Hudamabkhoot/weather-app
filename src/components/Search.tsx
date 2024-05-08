import React from 'react';
import styles from '../css-modules/Search.module.css';
import Location from '../assets/location.svg'

interface Search {
  cityName: string;
  setCityName: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
  getLocation: () => void;
}

const Search: React.FC<Search> = ({ cityName, setCityName, handleSearch, getLocation }) => {
  
  const handleSearchOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch(); 
    }
  };
  
  return (
    <div className={styles.search}>
      <button 
      onClick={getLocation}
      className={styles.locationIconBtn}
      >
        <img src={Location} className={styles.locationIcon}/>
      </button>
      <input
        type="text"
        placeholder="Enter city name"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        onKeyDown={handleSearchOnKeyDown}
      />
      <button 
      onClick={handleSearch}
      className={styles.searchBtn}
      >Search</button>
    </div>
  );
};

export default Search;
