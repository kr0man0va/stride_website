import React from 'react';
import { MathJaxContext, MathJax } from 'better-react-mathjax';

const AboutROI = () => {
    return(
        <div id="about">
            <h1>What is ROI and how is it calculated?</h1>
            <div className="allAbout">
                <div>
                    <h2>ROI Definition</h2>
                    <p style={{textIndent: "50px"}}>Return on investment is a ratio between net income and investment. 
                    A high ROI means the investment's gains compare favourably to its cost.  
                    By estimating the future earnings resulting from a college degree and comparing them to the associated expenses, individuals can assess whether the investment in higher education aligns with their long-term career goals and financial aspirations.</p>
                </div>
                <div>
                    <h2>ROI Formula</h2>
                    <p style={{textIndent: "50px"}}> At its core, ROI is a simple yet powerful formula that calculates the net gain or loss generated from an investment, expressed as a percentage of the initial investment cost. 
                    The formula for calculating ROI is as follows:</p>
                    <MathJaxContext>
                        <MathJax>
                        {'\\(ROI = {Profit (10 years) - Cost \\over Cost}*100 \\%\\)'}
                        </MathJax>
                    </MathJaxContext>
                </div>
                <div>
                    <h2>Our Sources</h2>
                    <p style={{textIndent: "50px"}}>The data sources used to populate our website and calculate Return on Investment are derived from public government sources. 
                    Ensuring transparency and reliability, we rely on publicly accessible data to provide you with an accurate and up-to-date information. 
                    We adhere to a high standard of data integrity and strive to instill confidence in the credibility of the information presented on our platform.</p>
                </div>
            </div>
        </div>
    );
}

export default AboutROI;