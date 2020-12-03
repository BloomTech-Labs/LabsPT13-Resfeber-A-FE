import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../common';
import './RenderHome.css';

function RenderHomePage(props) {
  const { userInfo, authService } = props;
  return (
    <div className="containerDiv">
      <h1>Resfeber</h1>
      <div>
        <p>Below are some nice links:</p>
        <p>
          <Link to="/createTrip">Create Trip</Link>
        </p>
        <p>
          <Link to="/profile-list">Profiles Example</Link>
        </p>
        <p>
          <Link to="/example-list">Example List of Items</Link>
        </p>
        <p>
          <Link to="/datavis">Data Visualizations Example</Link>
        </p>
        <p>
          <Button
            handleClick={() => authService.logout()}
            buttonText="Logout"
          />
        </p>
      </div>
    </div>
  );
}
export default RenderHomePage;
