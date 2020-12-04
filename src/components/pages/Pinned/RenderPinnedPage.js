import React from 'react';
import './Pinned.css';
import Logo from './Logo.svg';

// import PropTypes from 'prop-types';

function RenderPinnedPage(props) {
  return (
    <div className="page">
      <div className="search-n-feed">
        <div className="logo-container">
          <img className="crLogo" src={Logo} alt="Logo" />
        </div>
        <div className="split-box">
          <div className="search-box">
            <div className="crTitle">Create Trip: </div>
            <form className="searchForm">
              <label>
                Search:
                <input className="searchBar" type="text" name="Search" />
              </label>
              <input className="submit" type="submit" value="Submit" />
            </form>
          </div>
          <div className="pinned-items">
            <div className="pinned-title">Trip Details:</div>
            <ul>
              <li>Dinner</li>
              <li>Hotel</li>
              <li>Activity</li>
              <li>Land Mark</li>
              <li>Activity Day 2</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RenderPinnedPage;
