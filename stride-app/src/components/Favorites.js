import React from 'react';
import { MDBDataTable } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import Email from "../components/Email.js";

const Favorites = ({favorites}) => {

  const columns = favorites.length > 0 ? Object.keys(favorites[0]).filter((key) => 
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
    rows: favorites,
  };
    
  return (
    <div id="fav">
        {(favorites.length > 0 ?
            (<>
            <Email favorites={favorites} />
            <MDBDataTable responsive striped bordered small data={data} paging noBottomColumns={true}/> </>) :
            (<p>No favorite programs found. Please select a program from the map!</p>))} 
    </div>
  );
};

export default Favorites;