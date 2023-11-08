import './App.css';
import React, { useEffect, useState } from "react"

import Navbar from "./components/Navbar"
import Description from "./components/Description"
import Instructions from "./components/Instructions"
import Filters from "./components/Filters"
import ROI from "./components/ROI"
import Footer from "./components/Footer"

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

  useEffect(() => {
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
    };
    
    fetchData();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Description />
      <Instructions />
      <Filters parsedData={parsedData} setFilteredData={setFilteredData} setClicked={setClicked}/>
      <ROI parsedData={filteredData} clicked={clicked}/>
      <Footer />
    </div>
  );
}

export default App;
