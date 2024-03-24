import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapComponent = () => {
  const [coordinates, setCoordinates] = useState([12.965050999206127, 77.69332165860516]); // Initial coordinates

  // Function to update coordinates
  const updateCoordinates = (lat, lon) => {
    setCoordinates([lat, lon]);
  };

  return (
    <div>
      <MapContainer
        center={coordinates}
        zoom={13}
        style={{ height: '400px', width: '400px', borderWidth: '2px', border: 'solid' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={coordinates}>
          <Popup>
            Latitude: {coordinates[0]} <br />
            Longitude: {coordinates[1]}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;