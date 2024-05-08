import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City, Position } from '../interfaces/weather.interfaces';

const getInitialCity = () => {
  const localSavedCities = window.localStorage.getItem('savedCities');
  if (localSavedCities) {
    return JSON.parse(localSavedCities);
  }
  window.localStorage.setItem('savedCities', JSON.stringify([])); // Corrected line
  return [];
};

let storedUserLocation: Position | null = null;
const userLocationString = window.localStorage.getItem('userLocation');
if (userLocationString !== null) {
  storedUserLocation = JSON.parse(userLocationString);
}

const initialUserLocation: Position = storedUserLocation || {
  latitude: 0,
  longitude: 0,
};

const initialLocalTime = '';

const initialValue = {
  citiesList: getInitialCity(),
  userLocation: initialUserLocation,
  localTime: initialLocalTime,
};


export const citiesSlice = createSlice({
  name: 'cities',
  initialState: initialValue,
  reducers: {
    addCity: (state, action: PayloadAction<City>) => {
      const cityName = action.payload.name;
      const isCityExists = state.citiesList.some((city: City) => city.name === cityName);
      
      if (!isCityExists) {
        state.citiesList.push(action.payload);
        window.localStorage.setItem('savedCities', JSON.stringify(state.citiesList));
      }
    },
    deleteCity: (state, action) => {
      const citiesList = window.localStorage.getItem('savedCities');
      if (citiesList) {
        let citiesListArr = JSON.parse(citiesList);
        citiesListArr = citiesListArr.filter((city: City) => city.id !== action.payload);
        window.localStorage.setItem('savedCities', JSON.stringify(citiesListArr));
        state.citiesList = citiesListArr;
      }
    },
    setUserLocation: (state, action: PayloadAction<Position>) => {
      state.userLocation = action.payload;
      window.localStorage.setItem('userLocation', JSON.stringify(action.payload));
    },
  },
});


export const { addCity, deleteCity, setUserLocation } = citiesSlice.actions;
export default citiesSlice.reducer;
