import './App.css';
import React, { useEffect, useState } from "react"

import Navbar from "./components/Navbar"
import Description from "./components/Description"
import Instructions from "./components/Instructions"
import Filters from "./components/Filters"
import ROI from "./components/ROI"
import Footer from "./components/Footer"
import MapC from "./components/MapC"
import Favorites from "./components/Favorites"
import About from "./components/AboutROI"

import * as xlsx from "xlsx";

import exampleFile from './context/Stride_Funding_data.xlsx';

function App() {

  const [parsedData, setParsedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [view, setView] = useState('map');
  const [favorites, setFavorites] = useState([]);
  
  useEffect(() => {
    // Attach the scroll listener to the div
    const menu = document.querySelector('.nav');
    if(menu) {
      window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
          menu.classList.add('nav-scrolled');
        } else if (window.scrollY < 50) {
          menu.classList.remove('nav-scrolled');
        }
      })
    }

    // Get data
    const fetchData = async () => {
      const startTime = performance.now();

      const response = await fetch(exampleFile);
      const arrayBuffer = await response.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);

      const workbook = xlsx.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[6];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = xlsx.utils.sheet_to_json(worksheet, { raw: false });

      const allFields = Array.from(new Set(jsonData.flatMap(item => Object.keys(item))));
          
      const cleanedData = jsonData.map(item =>
        Object.fromEntries(allFields.map(field => [field, (item[field]?.trim() === 'NULL' ? 'NaN' : item[field]?.trim()) || 'NaN']))
      );

      setParsedData(cleanedData);

      const noNaNData = cleanedData.filter(item => {
        for (const key in item) {
          if (item[key] === "NaN") {
            return false; // Exclude the item if it contains "NaN"
          }
        }
        return true; // Include the item if it does not contain "NaN"
      });

      setFilteredData(noNaNData);

      const endTime = performance.now();
    
      console.log(`Conversion took ${(endTime - startTime)/1000} seconds`);
    };
    
    fetchData();

  }, []);

  const handleSwitchView = (newView) => {
    setView(newView);
  };

  return (
    <div className="App">
      <Navbar />
      <Description />
      <Instructions />
      <About />
      <div id='styleHeading'>
        <h1>What do you want to explore?</h1>
        <h2>Fill out the fields below to receive your free return-on-investment calculations
            for educational opportunities around United States. Press filter button to view 
            your personalized results.
        </h2>
      </div>
      <div id='changePlace'>
        <Filters parsedData={parsedData} setFilteredData={setFilteredData}/>
        <div style={{width:'100%'}}>
          <div className='dissapear'>
            <h1 id="res">View Results</h1>
              <p>Explore your educational options by interacting with different markers on the map.</p>
          <hr className="solid2"></hr>
          </div>
          <div id="choose">
            <button className="but1" onClick={() => handleSwitchView('map')}>Map</button>
            <button className="but2" onClick={() => handleSwitchView('table')}>Table</button>
            <button className="but3" onClick={() => handleSwitchView('favorites')}>Favorites</button>
          </div>

          <div className={`map-container ${view === 'map' ? '' : 'hidden'}`}>
            <MapC filteredData={filteredData} favorites={favorites} setFavorites={setFavorites} />
          </div>

          <div className={`roi-container ${view === 'table' ? '' : 'hidden'}`}>
            <ROI parsedData={filteredData}/>
          </div>

          <div className={`favorites-container ${view === 'favorites' ? '' : 'hidden'}`}>
            <Favorites favorites={favorites} setFavorites={setFavorites} />
          </div>

        </div>
    </div>
      <Footer />
    </div>
  );
}

export default App;
