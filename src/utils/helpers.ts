const convertTo12HourFormat = (hour: string): string => {
  const [hourString, minutesString] = hour.split(":");
  let timeInhours = parseInt(hourString);
  const timeOfDay = timeInhours >= 12 ? "PM" : "AM";
  timeInhours = timeInhours % 12 || 12; 
  return `${timeInhours}:${minutesString} ${timeOfDay}`;
};

const temperatureTime = (hourString: string): string => {
  const [hour, timeOfDay] = hourString.split(" ");
  const adjustedHour = timeOfDay === "PM" ? parseInt(hour) + 12 : parseInt(hour);
  return `${adjustedHour}:00`;
};

const getDayByDate = (dateString: string): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[new Date(dateString).getDay()];
};
  
  export { convertTo12HourFormat, temperatureTime, getDayByDate };
  
  