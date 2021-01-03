import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../common';
import './RenderHome.css';
import rLogo from './Logo.svg';

function RenderHomePage(props) {
  const { userInfo, authService } = props;
  console.log(userInfo);
  return (
    <div className="containerDiv">
      <img className="rLogo" src={rLogo} alt="rLogo" />
      <div className="list-links">
        <p>Below are some nice links:</p>
        <p>
          <Link to="/manage-trip">Create Trip</Link>
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
          {/* Added link to test Expanded Page Will delete later */}
          <Link to="/expandedPage">Expanded Page Test</Link>
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
