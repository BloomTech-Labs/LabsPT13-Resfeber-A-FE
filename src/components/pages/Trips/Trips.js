import React, { useState, useEffect, useMemo } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { apiGet, apiPost } from '../../../api';
import { InputGroup, InputGroupAddon, Input, Button, Form } from 'reactstrap';

function Search() {
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
        //console.log(info);
        apiGet(authState, '/trips', { id: info.sub }).then(data => {
          console.log('GET /trips/:user_id', data.data);
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
  }, [memoAuthService]);

  const handleChanges = event => {
    setTrip_name(event.target.value);
  };

  /* const createTrip = (event) => {
    event.preventDefault()
    const body = {
      headers: { Authorization: `Bearer ${authState.idToken}` },
      user_id: userInfo.sub,
      trip_name: trip_name
    }
    console.log("createTrip body:",body)
    axios.post(`${process.env.REACT_APP_API_URI}/trips`, body);
  } */

  const createTrip = event => {
    event.preventDefault();
    apiPost(authState, '/trips', {
      user_id: userInfo.sub,
      trip_name: trip_name,
    });
  };

  return (
    <>
      <div id="trips-container">
        <div id="trips-list">
          {authState.isAuthenticated && userInfo && trips
            ? trips.map(e => {
                return <h2 key={e.id}>{e.destination_name}</h2>;
              })
            : null}
        </div>
        <Form onSubmit={createTrip}>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <Button type="submit"> Submit </Button>
            </InputGroupAddon>
            <Input placeholder="Beach Getaway" onChange={handleChanges} />
          </InputGroup>
        </Form>
      </div>
    </>
  );
}

export default Search;
