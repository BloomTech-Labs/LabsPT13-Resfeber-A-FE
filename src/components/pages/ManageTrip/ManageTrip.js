import React, { useState, useEffect, useMemo, useContext } from 'react';
import './ManageTrip.css';
import Logo from './Logo.svg';
import axios from 'axios';
import Map from './Map';
import { useOktaAuth } from '@okta/okta-react';
import { apiGet, apiPost, getAuthHeader, apiDelete } from '../../../api';

import TripContext from '../../context/tripBeingEdited';

import { Link, Route } from 'react-router-dom';

require('dotenv').config();

//declaring here so I can use it to get state in the global scope.
let resObj = [{}];
let cooords = {};
let tripIt = {};
let itemDelete = {};
let tripItemStr = [];
var itemDeets = [];

function ManageTrip(props) {
  const [trip, setTrip] = useContext(TripContext);
  const { authState, authService } = useOktaAuth();
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([{}]);
  const [itemDetails, setItemDetails] = useState([{}]);
  const [tripItems, setTripItems] = useState([]);
  const [coords, setCoords] = useState([{}]);
  const [memoAuthService] = useMemo(() => [authService], []);
  const [userInfo, setUserInfo] = useState(null);

  var tripArray = tripItems.map(renderList);
  var savedItems = [];

  function renderList(item) {
    return item;
  }

  //takes in user input from searchbar
  const handleChange = e => {
    setSearchValue(e.target.value);
  };

  //gets memoAuth from okta, sets users info to userInfo state
  useEffect(() => {
    tripArray = [''];
    // setTripItems(tripArray)
    let isSubscribed = true;
    memoAuthService
      .getUser()
      .then(info => {
        axios
          .get(
            `${process.env.REACT_APP_API_URI}/trips/${info.sub}/${trip.id}`,
            { headers: getAuthHeader(authState) }
          )
          .then(data => {
            console.log('data from memoAuth useEffect', data.data);
            data.data.forEach(e => {
              itemDeets = [{}];
              savedItems = data.data;
              itemDeets = savedItems;
              // console.log("*******saved items obj: ", savedItems);
              savedItems.forEach(e => {
                tripArray.push(e.item_name);
              });
            });

            setItemDetails(itemDeets);
            return tripItems, itemDeets, itemDetails;
          });
        setTripItems(tripArray);
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

  //setting state with local storage (this runs first so data doesnt get over-written)
  useEffect(() => {
    const searchVal = localStorage.getItem('search-value');
    if (searchVal) {
      setSearchValue(JSON.parse(searchVal));
    }
    const searchRes = localStorage.getItem('search-results');
    if (searchRes) {
      setSearchResults(JSON.parse(searchRes));
    }
    // const tripN = localStorage.getItem('trip-name');
    // if (tripN) {
    //   setTripName(JSON.parse(tripN));
    // }
    const tripThings = localStorage.getItem('trip-items');
    if (tripThings) {
      setTripItems(JSON.parse(tripThings));
    }
  }, []);

  //local storage use effects
  useEffect(() => {
    localStorage.setItem('search-value', JSON.stringify(searchValue));
    localStorage.setItem('search-results', JSON.stringify(searchResults));
    // localStorage.setItem('trip-name', JSON.stringify(tripName));
    localStorage.setItem('trip-items', JSON.stringify(savedItems));
  });

  //plugs user search value into the GET call to the google places API
  function handleSubmit(e) {
    console.log(
      'from memo UseEff fro each Arrays : item deets: OUTSIDE',
      itemDeets,
      'in state: ',
      itemDetails,
      'trip items state: ',
      tripItems
    );
    cooords = {};
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
        // console.log("*****RES OBJ: ", resObj);
        Object.values(resObj).forEach(val => {
          var geo = val.geometry;
          console.log('**** Search result geometry: ', geo);
        });
        setCoords(cooords);
        console.log('COORDS: ', coords);
      })
      .catch(error => console.log('error', error));
  }

  //iterating over the response/state object
  Object.values(searchResults).forEach(val => {
    // console.log('VAL', val, 'typeVAL Name: ', val.name)
    return val;
  });

  //POST request to BE
  function sendTriptoBE() {
    itemDetails.forEach(e => {
      itemDelete = { item_id: e.id };
      console.log('itemDelete: ', itemDelete, 'e id', e.id);
      apiDelete(authState, '/items', itemDelete);
      console.log('itemDelete after api call : ', itemDelete);
    });
    console.log('deleted item details', itemDetails);
    tripItemStr.forEach(e => {
      tripIt = { user_id: userInfo.sub, item_name: e, trip_id: trip.id };
      console.log('tripIt: ', tripIt, 'e to string after tripIt: ', e);
      apiPost(authState, '/items', tripIt);
    });
    console.log('Trip Details after sendTriptoBE: ', tripItemStr);
  }

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
              <Map />
            </div>
            <div className="results">Searching for: {searchValue}</div>

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
            <div className="trip-name">{trip ? trip.name : null}</div>
            <div className="tripList">
              {tripItems.length > 0 &&
                tripItems.map(item => (
                  <div
                    className="tripItem"
                    //removes trip item from trippArray, then sets tripItems to tripArray (unformatted item and without id)
                    onClick={() => {
                      var itemInd = tripArray.indexOf(item);
                      tripArray.splice(itemInd, 1);
                      setTripItems(tripArray);
                      console.log('tripItems after click: ', tripArray);
                    }}
                  >
                    {item}
                  </div>
                ))}
            </div>
            <button
              className="submitTripDetails"
              onMouseEnter={() => {
                tripItemStr = [];
                console.log('empty tripitemstr: ', tripItemStr);
                tripItems.forEach(e => {
                  var stringE = e;
                  var ele = stringE.toString();
                  var elem = ele.replace(/,/g, ' ');
                  console.log(' e to string after replace: ', elem);
                  tripItemStr.push(elem);
                  console.log('tripItemStr: ', tripItemStr);
                  return tripItemStr;
                });
                console.log('mouse over trip details: ', tripItemStr);
              }}
              onClick={sendTriptoBE}
            >
              <Link to="/trips" className="submitText">
                Submit Trip Details
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageTrip;
