import React, { useState, useEffect } from 'react';
import {
  useLoadScript,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import useGeoLocation from './useGeoLocation';

require('dotenv').config();

const libraries = ['places'];
const mapContainerStyle = {
  width: '79vw',
  height: '30vh',
};

export default function Map() {
  const crntLocation = useGeoLocation();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
    libraries,
  });

  if (loadError) return 'Error loading the map...';
  if (!isLoaded) return 'Loading Map...';

  console.log('current location: ', crntLocation);
  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={7}
        center={crntLocation.coordinates}
      ></GoogleMap>
    </div>
  );
}
