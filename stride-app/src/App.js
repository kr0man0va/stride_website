//import {Route, Routes} from 'react-router-dom';
import './App.css';
import React, { useEffect } from "react"

import Navbar from "./components/Navbar"
import Description from "./components/Description"
import Instructions from "./components/Instructions"
import Map from "./components/Map"
import ROI from "./components/ROI"
import Footer from "./components/Footer"

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

  return (
    <div className="App">
      <Navbar />
      <Description />
      <Instructions />
      <Map />
      <ROI />
      <Footer />
    </div>
  );
}

export default App;
