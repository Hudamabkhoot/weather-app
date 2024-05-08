import styles from '../css-modules/Navbar.module.css'; 

interface Navbar {
    handleModal: () => void;
  }


const Navbar: React.FC<Navbar> =({handleModal}) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={'https://basmilius.github.io/weather-icons/production/fill/all/horizon.svg'} alt="Logo" />
      </div>

      <div className={styles.buttons}>
      <button 
      onClick={handleModal}
      className={styles.button}
      >Show Saved Cities</button>
      </div>
    </nav>
  );
};

export default Navbar;