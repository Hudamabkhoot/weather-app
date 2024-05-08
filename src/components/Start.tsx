import Location from '../assets/location.svg';

const Start = () => {
  return (
    <div className='start'>
      <h2 className='get-started'>
        <img src='https://basmilius.github.io/weather-icons/production/fill/all/horizon.svg' className='icon' />
        Get started with
        <img src={Location} className='locationIcon' />
      </h2>
    </div>
  );
};

export default Start;