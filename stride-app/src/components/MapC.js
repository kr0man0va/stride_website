import React from 'react';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';

import MarkerClusterGroup from 'react-leaflet-cluster';

const MapC = ({filteredData}) => {

  const customIcon = new Icon({
    iconUrl: require('../images/Marker.png'),
    iconSize: [38, 38]
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

  const popupContent = (college) => (
    <div>
      <h3>{college.Institution}</h3>
      <p><span className="bolded">Type:</span> {college.Type}</p>
      <p><span className='bolded'>In-State Tuition:</span> {college['In-State Tuition']}</p>
      <p><span className='bolded'>Out-of-State Tuition:</span> {college['Out-of-State Tuition']}</p>
      <p><span className='bolded'>Cost of Living Index:</span> {college['Cost Of Living Index']}</p>
      <p><span className='bolded'>In-State ROI:</span> {college['In-State ROI']}</p>
      <p><span className='bolded'>Out-of-State ROI:</span> {college['Out-of-State ROI']}</p>
      <div className="tableCont">
      <table className="tablePop">
        <thead>
          <tr>
            <th className='bolded'>Major</th>
            <th className='bolded'>Average Salary</th>
          </tr>
        </thead>
        <tbody>
          {college.majors.map((major, majorIndex) => (
            <tr key={majorIndex}>
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
                position={[parseFloat(marker.Latitude), parseFloat(marker.Longitude)]}
                icon={ customIcon }
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