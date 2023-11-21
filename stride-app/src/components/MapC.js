import React, {useEffect} from 'react';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';

import MarkerClusterGroup from 'react-leaflet-cluster';

const MapC = ({filteredData, favorites, setFavorites}) => {

  const customIcon = (college) => new Icon({
    iconUrl: require('../images/Marker.png'),
    iconSize: [38, 38],
    className: favorites.some(fav => fav.Institution === college.Institution) ? 'yellow-icon' : ''
  });

  const colleges = {};

  // Collect data for each college
  filteredData.forEach((marker) => {
    if (marker.Latitude !== 'NaN' && marker.Longitude !== 'NaN') {
      if (!colleges[marker.Institution]) {
        colleges[marker.Institution] = {
          ...marker,
          majors: [],
        };
      }
      colleges[marker.Institution].majors.push({
        major: marker.Major,
        salary: marker['Average Salary'],
      });
    }
  });

  const addOrRemoveFavorite = (collegeName, major) => {
    const newFavorites = [...favorites];
    const index = newFavorites.findIndex(fav => fav.Institution === collegeName && fav.Major === major);
  
    console.log("Index is " + index);

    if (index === -1) {
      // Find the corresponding college in filteredData
      const selectedCollege = filteredData.find(college => college.Institution === collegeName && college.Major === major);
  
      newFavorites.push(selectedCollege);
      
    } else {
      newFavorites.splice(index, 1);
    }
  
    setFavorites(newFavorites);
  };

  useEffect(() => {
    console.log(favorites);
  }, [favorites]);

  const popupContent = (college) => (
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
    </div>
  );
    
  return (
    <div id='mapc'>
      <MapContainer preferCanvas={true} center={[37.0902, -95.7129]} zoom={4}>
        {/* <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
        </TileLayer> */}

        <TileLayer
          attribution="CartoDB Voyager"
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        <MarkerClusterGroup chunkedLoading={true}>
          {Object.values(colleges).map((marker) => (
              <Marker
                key={marker.Institution}
                position={[parseFloat(marker.Latitude), parseFloat(marker.Longitude)]}
                icon={ customIcon(marker) }
              >
                {/* <Popup>
                  <div>
                    <h3>{marker.Institution}</h3>
                    <p><span className='bolded'>Type:</span> {marker.Type}</p>
                    <p><span className='bolded'>Major:</span> {marker.Major}</p>
                    <p><span className='bolded'>In-State Tuition:</span> {marker['In-State Tuition']}</p>
                    <p><span className='bolded'>Out-Of-State Tuition:</span> {marker['Out-Of-State Tuition']}</p>
                    <p><span className='bolded'>Cost of Living Index:</span> {marker['Cost Of Living Index']}</p>
                    <p><span className='bolded'>Average Salary:</span> {marker['Average Salary']}</p>
                    <p><span className='bolded'>In-State ROI:</span> {marker['In-State ROI']}</p>
                    <p><span className='bolded'>In-State ROI:</span> {marker['Out-Of-State ROI']}</p>
                  </div>
                </Popup> */}
                <Popup maxWidth={400} minWidth={400}>{popupContent(marker)}</Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default MapC;