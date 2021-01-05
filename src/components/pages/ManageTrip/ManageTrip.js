import React, { useState, useEffect } from 'react';
import './ManageTrip.css';
import Logo from './Logo.svg';
import axios from 'axios';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

import Map from './mapscreen.png';
import { Link, Route } from 'react-router-dom';

require('dotenv').config();

//declaring here so I can use it to get state in the global scope.
let resObj = [{}];

function ManageTrip(props) {
  const [searchValue, setSearchValue] = useState('');
  const [tripName, setTripName] = useState('Untitled');
  const [typeName, setTypeName] = useState('');
  const [searchResults, setSearchResults] = useState([{}]);
  const [tripItems, setTripItems] = useState([]);
  // const [tripDetails, setTripDetails] = useState([{tripName, tripItems}])

  var tripArray = tripItems.map(renderList);

  function renderList(item) {
    return item;
  }

  //takes in user input from searchbar
  const handleChange = e => {
    setSearchValue(e.target.value);
  };

  //names trip
  const handleNameSubmit = e => {
    e.preventDefault();
    setTripName(typeName);
    return tripName;
  };

  const handleNameChange = e => {
    setTypeName(e.target.value);
  };

  //deletes trip name
  function clearName() {
    setTripName('Untitled');
    return tripName;
  }

  //setting state with local storage
  useEffect(() => {
    const searchVal = localStorage.getItem('search-value');
    if (searchVal) {
      setSearchValue(JSON.parse(searchVal));
    }
    const searchRes = localStorage.getItem('search-results');
    if (searchRes) {
      setSearchResults(JSON.parse(searchRes));
    }
    const tripN = localStorage.getItem('trip-name');
    if (tripN) {
      setTripName(JSON.parse(tripN));
    }
    const tripThings = localStorage.getItem('trip-items');
    if (tripThings) {
      setTripItems(JSON.parse(tripThings));
    }
  }, []);

  //local storage use effects
  useEffect(() => {
    localStorage.setItem('search-value', JSON.stringify(searchValue));
    localStorage.setItem('search-results', JSON.stringify(searchResults));
    localStorage.setItem('trip-name', JSON.stringify(tripName));
    localStorage.setItem('trip-items', JSON.stringify(tripItems));
  });

  //plugs user search value into the GET call to the google places API
  function handleSubmit(e) {
    e.preventDefault();
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchValue}&key=${process.env.REACT_APP_GOOGLE_KEY}`;

    var myHeaders = new Headers();
    myHeaders.append('Access-Control-Allow-Origin', '*');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    // console.log('THE URL GOING TO API: ', url);
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
  }

  //iterating over the response/state object
  Object.values(searchResults).forEach(val => {
    console.log('VAL', val, 'typeVAL Name: ', val.name);
    return val;
  });
  console.log('STATE OUTSIDE: ', searchResults, 'specific: ', searchResults[0]);

  return (
    <div className="page">
      <div className="search-n-feed">
        <div className="logo-container">
          <img className="crLogo" src={Logo} alt="Logo" />
          <div className="navGroup">
            <button className="navButt">
              <Link to="/">Home</Link>
            </button>
            <button className="navButt">
              <Link to="/trips">My Trips</Link>
            </button>
          </div>
        </div>
        <div className="split-box">
          <div className="search-box">
            <div className="forms">
              <div className="crTitle">Manage Trip: </div>
              <form className="nameTrip" onSubmit={handleNameSubmit}>
                <label className="tripTitle">
                  Trip Name:
                  <input
                    className="searchBar2"
                    type="text"
                    name="Name"
                    placeholder="Beach Trip"
                    value={typeName}
                    onChange={handleNameChange}
                  />
                </label>
                <input className="submitName" type="submit" value="Submit" />
              </form>
              <form className="searchForm" onSubmit={handleSubmit}>
                <label className="search">
                  Search:
                  <input
                    className="searchBar"
                    type="text"
                    name="Search"
                    placeholder="Seafood in Myrtle Beach"
                    value={searchValue}
                    onChange={handleChange}
                  />
                </label>
                <input className="submit" type="submit" value="Submit" />
              </form>
            </div>
            <div className="mapContainer">
              <img className="map" src={Map} alt="Map" />
            </div>
            <div className="results">Results: {searchValue}</div>

            <div className="resultsFill">
              {/* conditonal rendering to prevent empty item card from rendering when there is no search value */}
              {searchResults.length > 1 &&
                searchResults.map((val, index) => (
                  <div className="itemCard">
                    <div className="rightBox">
                      <p val={val} key={val.id}>
                        {val.name}
                      </p>
                      <p val={val} key={val.id}>
                        {val.formatted_address}
                      </p>
                      <div className="buttonRow">
                        <button
                          className="addTripButton"
                          onClick={() =>
                            tripArray.push([
                              val.formatted_address.split(',')[1],
                              ' - ',
                              val.types[0]
                                .toUpperCase()
                                .split('_')
                                .join(' '),
                              ': ',
                              val.name,
                            ]) && setTripItems(tripArray)
                          }
                          val={val}
                          key={val.id}
                        >
                          Add to Trip
                        </button>
                        <button
                          className="viewDeetsButton"
                          onClick={() => props.setTripInfoExpandedPage(val)}
                          val={val}
                          key={val.id}
                        >
                          <Link to="/expandedPage">View Details</Link>
                        </button>
                      </div>
                    </div>
                    <div className="leftBox">
                      <img
                        className="itemIcon"
                        val={val}
                        key={val.id}
                        src={val.icon}
                      />
                      <p val={val} key={val.id}>
                        Rating: {val.rating}
                      </p>
                      <p val={val} key={val.id}>
                        {/* conditonal rendering to indicate if business is still operational */}
                        {val.business_status !== 'OPERATIONAL' && (
                          <p>out of business</p>
                        )}
                        {val.business_status === 'OPERATIONAL' && (
                          <p>in business</p>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="pinned-items">
            <div className="pinned-title">Trip Details:</div>
            <div className="trip-name" onClick={clearName}>
              {tripName}
            </div>
            <div className="tripList">
              {tripArray.length > 0 &&
                tripArray.map(item => (
                  <ul>
                    <li
                      className="tripItem"
                      onClick={() =>
                        tripArray.pop(item) && setTripItems(tripArray)
                      }
                    >
                      {item}
                    </li>
                  </ul>
                ))}
            </div>
            <button className="submitTripDetails">Submit Trip Details</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageTrip;

{
  /* <div className="itemCard">
                <div className="itemContainer">
                  <img className="items" src={Items} alt="Items" />
                </div>
              </div> */
}
