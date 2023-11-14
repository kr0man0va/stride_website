import React from 'react';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon} from 'leaflet';

import MarkerClusterGroup from 'react-leaflet-cluster';

const MapC = ({filteredData}) => {

  const customIcon = new Icon({
    iconUrl: require('../images/Marker.png'),
    iconSize: [38, 38]
  });
    
  return (
    <div id='mapc'>
      <MapContainer center={[37.0902, -95.7129]} zoom={4}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
        </TileLayer>

        <MarkerClusterGroup chunkedLoading>
          {filteredData
            .filter((marker) => marker.Latitude && marker.Longtitude)
            .map((marker, index) => (
              <Marker
                key={index}
                position={[parseFloat(marker.Latitude), parseFloat(marker.Longtitude)]}
                icon={ customIcon }
              >
                <Popup>
                  <div>
                    <h3>{marker.University}</h3>
                    <p><span class='bolded'>Type:</span> {marker.Type}</p>
                    <p><span class='bolded'>Major:</span> {marker.Major}</p>
                    <p><span class='bolded'>In-State Tuition:</span> {marker['In-state Tuition']}</p>
                    <p><span class='bolded'>Cost of Living Index:</span> {marker['Cost of Living Index']}</p>
                    <p><span class='bolded'>Average Salary:</span> {marker['Average Salary']}</p>
                    <p><span class='bolded'>In-State ROI:</span> {marker['In-state ROI']}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default MapC;