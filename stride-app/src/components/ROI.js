import React from 'react';
// import * as xlsx from "xlsx";
import { MDBDataTable } from 'mdbreact';
// import exampleFile from '../context/state_M2019_dl.xlsx';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

const ROI = ({parsedData, clicked}) => {

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
      {/* {clicked ?  */}
                {(parsedData.length > 0 ?
                    (<MDBDataTable responsive striped bordered small data={data} paging noBottomColumns={true}/>) :
                    (<p>No results were found. Please try again!</p>))} 
                    {/* : null} */}
    </div>
  );
};

export default ROI;