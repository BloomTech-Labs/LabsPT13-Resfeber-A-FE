import React, { useState, useEffect, useMemo } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import List from '../../common/List';
import { apiGet, apiPost, apiDelete } from '../../../api';

function Search() {
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [pinned, setPinned] = useState(null);

  // eslint-disable-next-line
  const [memoAuthService] = useMemo(() => [authService], []);

  useEffect(() => {
    let isSubscribed = true;

    memoAuthService
      .getUser()
      .then(info => {
        console.log(info);
        apiGet(authState, '/pinned', { id: info.sub }).then(data => {
          console.log(data.data);
          setPinned(data.data);
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

  return (
    <>
      {authState.isAuthenticated && userInfo && pinned
        ? pinned.map(e => {
            return <h2 key={e.id}>{e.destination_name}</h2>;
          })
        : null}
    </>
  );
}

export default Search;
