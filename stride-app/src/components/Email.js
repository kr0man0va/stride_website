import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import ReactDOMServer from 'react-dom/server';

const Email = ({favorites}) => {

    const form = useRef();

    const filteredColumns = favorites.length > 0
    ? Object.keys(favorites[0])
        .filter((key) => 
          key.trim() !== 'Latitude' &&
          key.trim() !== 'Longitude' &&
          key.trim() !== 'CIPCODE' &&
          key.trim() !== 'CREDLEV' &&
          key.trim() !== 'CREDDESC' &&
          key.trim() !== 'SOC' &&
          key.trim() !== 'Occ_title'
        )
        .map((key) => ({
          label: key,
          field: key,
        }))
    : [];

    const generateTable = () => {
        const headers = filteredColumns.map((column) => column.label);

        const tableContent = (
            <table className="tableHTML">
                <thead>
                <tr style={{border: '1px solid #ddd', padding: '8px', backgroundColor: 'rgb(245,245,245)'}}>
                    {headers.map((header, index) => (
                    <th key={index} style={{border: '1px solid #ddd', padding: '8px'}}>{header}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {favorites.map((college, index) => (
                    <tr key={index} style={{border: '1px solid #ddd', padding: '8px'}}>
                    {headers.map((header, index) => (
                        <td key={index} style={{border: '1px solid #ddd', padding: '8px'}}>{college[header]}</td>
                    ))}
                    </tr>
                ))}
                </tbody>
            </table>
        );

        const tableHTML = ReactDOMServer.renderToString(tableContent);

        return tableHTML;
    }

    const sendEmail = (e) => {
        e.preventDefault();

        const tableHTML = generateTable();
        const userEmail = e.target.user_email.value;

        var templateParams = {
            tableHTML: tableHTML,
            user_email: userEmail
        };

        // console.log(tableHTML);

        //change to env variables for security
        emailjs.send('service_90oxvjj', 'template_t5fq0d6', templateParams, '92KTH2HtSSvdJaNvL');
    
        alert("Email was sent!");
    };

    return(
        <form ref={form} onSubmit={sendEmail} className="emailForm">
            <label>Enter your email to save results:</label>
            <input id="inputE" type="email" name="user_email" placeholder="example@gmail.com" />
            <input id="button" type="submit" value="Send" />
        </form>
    );
}

export default Email;