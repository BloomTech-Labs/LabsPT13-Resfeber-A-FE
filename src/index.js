import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
} from 'react-router-dom';

import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import 'antd/dist/antd.less';

import { TripProvider } from './components/context/tripBeingEdited';
import WelcomePage from './components/pages/WelcomePage/WelcomePage';
import { NotFoundPage } from './components/pages/NotFound';
import { ExampleListPage } from './components/pages/ExampleList';
import { HomePage } from './components/pages/Home';
import { ProfileListPage } from './components/pages/ProfileList';
import { LoginPage } from './components/pages/Login/index.js';
import { ExampleDataViz } from './components/pages/ExampleDataViz';
import { config } from './utils/oktaConfig';
import { LoadingComponent } from './components/common';
import ManageTrip from './components/pages/ManageTrip/ManageTrip';
import ExpandedPage from './components/pages/ExpandedPage/ExpandedPage';
import { Trips } from './components/pages/Trips';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

function App() {
  const [trip, setTrip] = useState();
  /////State for expanded Page
  const [tripInfoExpandedPage, setTripInfoExpandedPage] = useState('');

  // The reason to declare App this way is so that we can use any helper functions we'd need for business logic, in our case auth.
  // React Router has a nifty useHistory hook we can use at this level to ensure we have security around our routes.
  const history = useHistory();

  const authHandler = () => {
    // We pass this to our <Security /> component that wraps our routes.
    // It'll automatically check if userToken is available and push back to login if not :)
    history.push('/welcome');
  };

  return (
    <Security {...config} onAuthRequired={authHandler}>
      <TripProvider value={[trip, setTrip]}>
        <Switch>
          <Route path="/welcome" component={WelcomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/implicit/callback" component={LoginCallback} />

          {/* <Route path="/createTrip" component={RenderPinnedPage} /> */}
          {/* <Route path="/manage-trip" component={ManageTrip} /> */}
          <SecureRoute path="/manage-trip">
            <ManageTrip
              tripInfoExpandedPage={tripInfoExpandedPage}
              setTripInfoExpandedPage={setTripInfoExpandedPage}
            />
          </SecureRoute>
          {/* <Route path="/expandedPage" component={ExpandedPage} /> */}
          <SecureRoute path="/expandedPage">
            <ExpandedPage
              tripInfoExpandedPage={tripInfoExpandedPage}
              setTripInfoExpandedPage={setTripInfoExpandedPage}
            />
          </SecureRoute>

          {/* any of the routes you need secured should be registered as SecureRoutes */}
          <Route
            path="/"
            exact
            component={() => <HomePage LoadingComponent={LoadingComponent} />}
          />
          <SecureRoute path="/trips" component={Trips} />
          <SecureRoute path="/example-list" component={ExampleListPage} />
          <SecureRoute path="/profile-list" component={ProfileListPage} />
          <SecureRoute path="/datavis" component={ExampleDataViz} />
          <Route component={NotFoundPage} />
        </Switch>
      </TripProvider>
    </Security>
  );
}
