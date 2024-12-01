import { useEffect } from 'react';
import { solarWind } from './api';

const Header = ({currentWinds, setCurrentWinds, label, setLabel}) => {
    
  const fetchSolarWindData = () => {
    solarWind()
      .then((data) => {
        const tags = data.data[0];
        const winds = data.data[data.data.length - 1];
        setLabel(tags);
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
        {label.map((tag, index) => (
          <div key={index}>
            {tag} - {currentWinds[index]}
          </div>
        ))}
      </>
  );

}

export default Header;