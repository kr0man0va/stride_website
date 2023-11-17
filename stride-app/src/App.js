import './App.css';
import React, { useEffect, useState } from "react"

import Navbar from "./components/Navbar"
import Description from "./components/Description"
import Instructions from "./components/Instructions"
import Filters from "./components/Filters"
import ROI from "./components/ROI"
import Footer from "./components/Footer"
import MapC from "./components/MapC"

import * as xlsx from "xlsx";
import exampleFile from './context/state_M2019_dl.xlsx';

function App() {
  
  // Attach the scroll listener to the div
  useEffect(() => {
      const menu = document.querySelector('.nav');
      if(menu) {
      window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            menu.classList.add('nav-scrolled');
        } else if (window.scrollY < 50) {
            menu.classList.remove('nav-scrolled');
        }
  })}})

  const [parsedData, setParsedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [clicked, setClicked] = useState(false);

  const [map, setMap] = useState(true);

  useEffect(() => {
    const startTime = performance.now();
    const fetchData = async () => {
    const response = await fetch(exampleFile);
    const arrayBuffer = await response.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);

    const workbook = xlsx.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[6];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet, { raw: false });

    setParsedData(jsonData);

    setFilteredData(jsonData);

    const endTime = performance.now();
    console.log(`Conversion took ${(endTime - startTime)/1000} seconds`);
    };
    
    fetchData();
  }, []);

  const newStyle = {
    color: map ? 'rgb(86,29,226)' : 'rgb(133, 133, 133)',
  };

  const newStyle2 = {
    color: map ? 'rgb(133, 133, 133)' : 'rgb(86,29,226)',
  };

  return (
    <div className="App">
      <Navbar />
      <Description />
      <Instructions />
      <div id='styleHeading'>
        <h1>What do you want to explore?</h1>
        <h2>Fill out the fields below to receive your free return-on-investment calculations
            for educational opportunities around United States. Press filter button to view 
            your personalized results.
        </h2>
      </div>
      <div id='changePlace'>
        <Filters parsedData={parsedData} setFilteredData={setFilteredData} setClicked={setClicked}/>
      {/* {clicked ? ( */}
        <div style={{width:'100%'}}>
          <div className='dissapear'>
            <h1 id="res">View Results</h1>
            {map ? (
              <p>Explore your educational options by interacting with different markers on the map.</p>) : (
              <p>Explore your educational options by viewing and searching the table.</p>)
            }
          <hr className="solid2"></hr>
          </div>
          <div id="choose">
            <h2 style={newStyle} onClick={() => setMap(true)}>Map</h2>
            <h3>|</h3>
            <h2 style={newStyle2} onClick={() => setMap(false)}>Table</h2>
          </div>
          {map ? (
            <MapC filteredData={filteredData}/>
          ) : (<ROI parsedData={filteredData} clicked={clicked}/>)}
        </div>
    </div>
      {/* ) : null} */}
      <Footer />
    </div>
  );
}

export default App;
