import React, { useState } from 'react';
import './ManageTrip.css';
import Logo from './Logo.svg';
import axios from 'axios';
import Map from './mapscreen.png';
import Items from './restaurants.png';

require('dotenv').config();

// import PropTypes from 'prop-types';

let resObj = [{}];

function ManageTrip() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([{}]);

  const handleChange = e => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchValue}&key=${process.env.REACT_APP_GOOGLE_KEY}`;

    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    console.log('THE URL GOING TO API: ', url);

    axios
      .get(url, requestOptions)
      .then(response => {
        resObj = response.data.results;
        resObj.map(item => {
          console.log('item ', item);
        });
        console.log(
          'the ReSuLtS: ',
          response.data.results,
          'setting resObj SEARCH RESULTS: ',
          resObj
        );
        setSearchResults(resObj);
      })
      .catch(error => console.log('error', error));
  };

  Object.values(searchResults).forEach(val => {
    console.log('VAL', val, 'typeVAL: ', val.name);
    return val;
  });
  console.log('STATE OUTSIDE: ', searchResults, 'specific: ', searchResults[0]);
  return (
    <div className="page">
      <div className="search-n-feed">
        <div className="logo-container">
          <img className="crLogo" src={Logo} alt="Logo" />
        </div>
        <div className="split-box">
          <div className="search-box">
            <div className="crTitle">Manage Trip: </div>
            <form className="searchForm" onSubmit={handleSubmit}>
              <label className="search">
                Search:
                <input
                  className="searchBar"
                  type="text"
                  name="Search"
                  placeholder="Powered by Google"
                  value={searchValue}
                  onChange={handleChange}
                />
              </label>
              <input className="submit" type="submit" value="Submit" />
            </form>
            <div className="mapContainer">
              <img className="map" src={Map} alt="Map" />
            </div>
            <div className="results">Results: {searchValue}</div>
            <div className="resultFill">
              {/* <h1>{val.name}</h1> */}
              <div className="itemCard">
                <div className="itemContainer">
                  <img className="items" src={Items} alt="Items" />
                </div>
              </div>
            </div>
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

export default ManageTrip;
