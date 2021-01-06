import React, { useState, useEffect, useMemo, useContext } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { apiGet, apiPost } from '../../../api';
import { InputGroup, InputGroupAddon, Input, Button, Form } from 'reactstrap';
import TripCard from './TripCard';

function Trips() {
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [trips, setTrips] = useState(null);
  const [trip_name, setTrip_name] = useState(null);

  // eslint-disable-next-line
  const [memoAuthService] = useMemo(() => [authService], []);

  useEffect(() => {
    let isSubscribed = true;

    memoAuthService
      .getUser()
      .then(info => {
        apiGet(authState, '/trips', { id: info.sub }).then(data => {
          setTrips(data.data);
        });
        // if user is authenticated we can use the authService to snag some user info.
        // isSubscribed is a boolean toggle that we're using to clean up our useEffect.
        if (isSubscribed) {
          setUserInfo(info);
        }
      })
      .catch(err => {
        isSubscribed = false;
        return setUserInfo(null);
      });
    return () => (isSubscribed = false);
  }, [memoAuthService, authState]);

  const handleChanges = event => {
    setTrip_name(event.target.value);
  };

  const createTrip = event => {
    event.preventDefault();
    apiPost(authState, '/trips', {
      user_id: userInfo.sub,
      trip_name: trip_name,
    }).then(response => {
      setTrips([...trips, response.data[0]]);
    });
  };

  const deleteTrip = id => {
    const newTrips = trips.filter(e => {
      return e.id !== id;
    });
    setTrips(newTrips);
  };

  /*  const updateTripName = trip => {
    const newTrips = trips;
    newTrips.forEach(e => {
      if (e.id === trip.id) {
        console.log(e.trip_name);
        e.trip_name = trip.trip_name;
      }
    });
    console.log(newTrips);
    setTrips(newTrips);
  }; */

  const updateTripName = trip => {
    const newTrips = trips.filter(e => {
      return e.id !== trip.id;
    });
    newTrips.push(trip);
    setTrips(newTrips);
  };

  return (
    <>
      <div
        id="trips-container"
        style={{ maxWidth: '70%', margin: '1.5rem auto', alignItems: 'center' }}
      >
        <div
          id="trips-list"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          {authState.isAuthenticated && userInfo && trips
            ? trips.map(e => {
                return (
                  <TripCard
                    key={e.id}
                    trip_name={e.trip_name}
                    id={e.id}
                    authState={authState}
                    deleteTrip={deleteTrip}
                    updateTripName={updateTripName}
                  />
                );
              })
            : <h1>Loading Trips</h1>}
        </div>
        <Form onSubmit={createTrip}>
          <InputGroup style={{ maxWidth: '30rem', margin: '1.5rem auto' }}>
            <InputGroupAddon addonType="prepend">
              <Button color="primary" type="submit">
                {' '}
                Submit{' '}
              </Button>
            </InputGroupAddon>
            <Input placeholder="Beach Getaway" onChange={handleChanges} />
          </InputGroup>
        </Form>
      </div>
    </>
  );
}

export default Trips;
