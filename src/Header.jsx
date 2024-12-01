import { useEffect } from 'react';
import { solarWind } from './api';

const Header = ({currentWinds, setCurrentWinds}) => {

  /*
  currentWinds data

  Index 0 - Date/Time
  Index 1 - Density 
  Index 2 - Speed
  Index 3 - Temperature
  */
    
  const fetchSolarWindData = () => {
    solarWind()
      .then((data) => {
        const winds = data.data[data.data.length - 1];
        setCurrentWinds(winds);
      })
      .catch((error) => console.error('Error fetching solar wind data:', error));
  };

  useEffect(() => {
    const now = new Date();
    const msUntilNextMinute = (60 - now.getSeconds()) * 1000;
    fetchSolarWindData();
    const timeout = setTimeout(() => {
      fetchSolarWindData();
      const interval = setInterval(fetchSolarWindData, 60000);
      return () => clearInterval(interval);
    }, msUntilNextMinute);
    return () => clearTimeout(timeout);
  }, []);

  return (
      <>
      <div>
        {currentWinds[0]}
        </div><div>
        {currentWinds[1]} 1/cm³
        </div><div>
        {currentWinds[2]} km/s
        </div>
        {currentWinds[3]} °K
      </>
  );

}

export default Header;