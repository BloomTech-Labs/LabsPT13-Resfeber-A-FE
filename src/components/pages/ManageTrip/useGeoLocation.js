import React, { useState, useEffect } from 'react';

const useGeoLocation = () => {
  const [currentLocation, setCurrentLocation] = useState({
    loaded: false,
    coordinates: { lat: '', lng: '' },
  });

  const onSuccess = currentLocation => {
    setCurrentLocation({
      loaded: true,
      coordinates: {
        lat: currentLocation.coords.latitude,
        lng: currentLocation.coords.longitude,
      },
    });
  };

  const onError = error => {
    setCurrentLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: 'Geolocation is not supported by the browser.',
      });
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return currentLocation;
};

export default useGeoLocation;
