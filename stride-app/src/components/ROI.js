import React from 'react';
import { MDBDataTable } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

const ROI = ({parsedData}) => {

  const columns = parsedData.length > 0 ? Object.keys(parsedData[0]).filter((key) => 
                  key.trim() !== 'Latitude' &&
                  key.trim() !== 'Longitude' &&
                  key.trim() !== 'CIPCODE' &&
                  key.trim() !== 'CREDLEV' &&
                  key.trim() !== 'CREDDESC' &&
                  key.trim() !== 'SOC' &&
                  key.trim() !== 'Occ_title').map((key) => ({
    label: key,
    field: key,
  })) : [];
    
  const data = {
    columns: columns,
    rows: parsedData,
  };
    
  return (
    <div id="roi">
      {(parsedData.length > 0 ?
        (<MDBDataTable responsive striped bordered small data={data} paging noBottomColumns={true}/>) :
        (<p>No results were found. Please try again!</p>))}
    </div>
  );
};

export default ROI;