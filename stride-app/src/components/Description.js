import React from 'react';
import logo from '../images/stride_climb.svg';

const Description = () => {
    return(
        <div id="description">
            <h1>Your Journey to Success Starts Here!</h1>
            <p>Unleash your potential using Personalized Education and Career Guidance Powered by Stride.</p>
            <img href={logo}></img>
        </div>
    );
}

export default Description;