import { useState } from 'react';
import Header from './Header';
import MusicBox from './MusicBox';

const App = () => {

  const [currentWinds, setCurrentWinds] = useState([]);
  const [label, setLabel] = useState([]);

  return (
    <>
    <Header currentWinds={currentWinds} setCurrentWinds={setCurrentWinds} label={label} setLabel={setLabel}/>
    <MusicBox currentWinds={currentWinds}/>
    </>
  );
};

export default App;