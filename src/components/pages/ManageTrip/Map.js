import React from 'react';
import {
  useLoadScript,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';

require('dotenv').config();
//${process.env.REACT_APP_GOOGLE_KEY}

const libraries = ['places', 'localContext'];
const mapContainerStyle = {
  width: '79vw',
  height: '30vh',
};

const center = {
  lat: 43.653225,
  lng: -79.383186,
};

export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsAPIKey: process.env.REACT_APP_GOOGLE_KEY,
    libraries,
  });

  if (loadError) return 'Error loading the map...';
  if (!isLoaded) return 'Loading Map...';

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
      ></GoogleMap>
    </div>
  );
}
