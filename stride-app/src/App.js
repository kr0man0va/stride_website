//import {Route, Routes} from 'react-router-dom';
import './App.css';

import Navbar from "./components/Navbar"
import Description from "./components/Description"
import Instructions from "./components/Instructions"
import Map from "./components/Map"
import ROI from "./components/ROI"

function App() {
  return (
    <div className="App">
      <Navbar />
      <Description />
      <Instructions />
      <Map />
      <ROI />
    </div>
  );
}

export default App;
