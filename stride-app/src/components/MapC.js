import React, {useEffect, useState, useMemo, useCallback} from 'react';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';

import MarkerClusterGroup from 'react-leaflet-cluster';

const MapC = ({filteredData, favorites, setFavorites}) => {

  const [colleges, setColleges] = useState({});

  useEffect(() => {
    const collectedColleges = {};

    // Collect data for each college
    filteredData.forEach((marker) => {
      if (marker.Latitude !== 'NaN' && marker.Longitude !== 'NaN') {
        if (!collectedColleges[marker.Institution]) {
          collectedColleges[marker.Institution] = {
            ...marker,
            majors: [],
          };
        }
        collectedColleges[marker.Institution].majors.push({
          major: marker.Major,
          salary: marker['Average Salary'],
        });
      }
    });

    setColleges(Object.values(collectedColleges));
  }, [filteredData]);

  const customIcon = useMemo(() => {
    return (college) => new Icon({
      iconUrl: require('../images/Marker.png'),
      iconSize: [38, 38],
      className: favorites.some(fav => fav.Institution === college.Institution) ? 'yellow-icon' : ''
    });
  }, [favorites]);

  const addOrRemoveFavorite = useCallback((collegeName, major) => {
    const newFavorites = [...favorites];
    const index = newFavorites.findIndex(fav => fav.Institution === collegeName && fav.Major === major);

    if (index === -1) {
      // Find the corresponding college in filteredData
      const selectedCollege = filteredData.find(college => college.Institution === collegeName && college.Major === major);
  
      newFavorites.push(selectedCollege);
      
    } else {
      newFavorites.splice(index, 1);
    }
  
    setFavorites(newFavorites);
  }, [favorites, setFavorites, filteredData]);

  const popupContent = useMemo( () => (college) => {
    // console.log("boo");
    return(
    <div>
      <h3>{college.Institution}</h3>
      <div className="centerPop">
        <div>
          <p><span className="bolded">Type:</span> {college.Type}</p>
          <p><span className='bolded'>In-State Tuition:</span> {college['In-State Tuition']}</p>
          <p><span className='bolded'>Out-of-State Tuition:</span> {college['Out-of-State Tuition']}</p>
        </div>
        <div>
          <p><span className='bolded'>Cost of Living Index:</span> {college['Cost Of Living Index']}</p>
          <p><span className='bolded'>In-State ROI:</span> {college['In-State ROI']}</p>
          <p><span className='bolded'>Out-of-State ROI:</span> {college['Out-of-State ROI']}</p>
        </div>
      </div>
      <div className="tableCont">
      <table className="tablePop">
        <thead>
          <tr>
            <th><span style={{fontSize:"200%",color:"yellow"}}>&#9733;</span></th>
            <th className='bolded'>Major</th>
            <th className='bolded'>Average Salary</th>
          </tr>
        </thead>
        <tbody>
          {college.majors.map((major, majorIndex) => (
            <tr key={majorIndex}>
              <td>
                <input
                  type="checkbox"
                  onChange={() => addOrRemoveFavorite(college.Institution, major.major)}
                />
              </td>
              <td>
                <strong>{major.major}</strong>
              </td>
              <td>
                {major.salary}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>);
}, [addOrRemoveFavorite]);
    
  return (
    <div id='mapc'>
      <MapContainer preferCanvas={true} center={[37.0902, -95.7129]} zoom={4}>

        <TileLayer
          attribution="CartoDB Voyager"
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        <MarkerClusterGroup chunkedLoading={true}>
          {Object.values(colleges).map((marker) => {
            // console.log("Marker");
            return(
              <Marker
                key={marker.Institution}
                position={[parseFloat(marker.Latitude), parseFloat(marker.Longitude)]}
                icon={ customIcon(marker) }
              >
                <Popup maxWidth={400} minWidth={400}>{popupContent(marker)}</Popup>
              </Marker>
            )})}
          </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default React.memo(MapC);