import React from 'react';
import logo from '../images/logo_2.PNG';

const Footer = () => {

    return(
        <nav className="footer">
            <ul>
                <li>
                    <a className="title" href="https://www.stridefunding.com/" target="_blank" rel="noreferrer noopener">
                        <img id='stride_logo' src={logo} alt="Stride"></img>
                    </a>
                </li>
                <li>
                    <p>Boston</p>
                </li>
                <li>
                    <p>Stride Funding, Inc.<br></br>
                        PO Box 961750<br></br>
                        Boston, MA 02196</p>
                </li>
            </ul>
            <ul>
                <li>
                    <p className="par">(214) 775-9960</p>
                </li>
                <li>
                    <p className="par">hello@stridefunding.com</p>
                </li>
                <li>
                    <p className="cop">
                    © Stride Funding, Inc. 2022. If you have questions regarding your payments, please visit our servicing provider.<br></br>
                    Loan products vary by school and issuer. Loans may be issued by Stride Funding, Inc or FinWise Bank, a Utah-chartered bank, Member FDIC.<br></br>
                    All loans are subject to individual approval and adherence to underwriting guidelines. Program restrictions, other terms, and conditions apply.
                    </p>
                </li>
            </ul>
            <ul>
                <li>
                    <a href="#description" className="par">Description</a>
                </li>
                <li>
                    <a href="#instructions" className="par">Instructions</a>
                </li>
                <li>
                    <a href="#map" className="par">Map</a>
                </li>
                <li>
                    <a href="#roi" className="par">ROI</a>
                </li>
            </ul>
        </nav>
    );
}

export default Footer;