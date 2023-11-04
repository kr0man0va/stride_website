import React, {useState, useEffect} from 'react';
import * as xlsx from "xlsx";
import { MDBDataTable } from 'mdbreact';
import exampleFile from '../context/state_M2019_dl.xlsx';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

const ROI = () => {

    const [parsedData, setParsedData] = useState([]);

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
        };
    
        fetchData();
    }, []);

    const columns = parsedData.length > 0 ? Object.keys(parsedData[0]).filter((key) => key.trim() !== 'Latitude' && key.trim() !== 'Longitude').map((key) => ({
        label: key,
        field: key,
      })) : [];
    
      const data = {
        columns: columns,
        rows: parsedData,
      };
    
      return (
        <div id="roi">
          {parsedData.length > 0 && <MDBDataTable responsive striped bordered small data={data} paging />}
        </div>
      );
    };

export default ROI;