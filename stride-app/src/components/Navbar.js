import React from 'react';
import logo from '../images/logo_nobg_1.png';

const Navbar = () => {

    return(
        <nav className="nav">
            <a className="title" href="https://www.stridefunding.com/" target="_blank" rel="noreferrer noopener">
                <img id='stride_logo' src={logo} alt="Stride"></img>
            </a>
            <ul>
                <li>
                    <a href="#description">Description</a>
                </li>
                <li>
                    <a href="#instructions">Instructions</a>
                </li>
                <li>
                    <a href="#filters">Explore ROI</a>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;