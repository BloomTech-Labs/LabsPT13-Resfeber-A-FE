import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './content_part.css';
import CustomCard from './CustomCard';
import axios from 'axios';
import { Row, Col, Rate, Spin, Space, Collapse, Image, Button } from 'antd';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

import { Input } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
const ContentPart = props => {
  const [placeDetails, setPlaceDetails] = useState('');
  const [apiStatus, setApiStatus] = useState(false);
  const [coordinates, setCoordinates] = useState({
    latMaps: 37.7749,
    lngMaps: -122.4194,
  });
  const { Panel } = Collapse;
  useEffect(() => {
    setCoordinates({
      latMaps: props.tripInfoExpandedPage.geometry.location.lat,
      lngMaps: props.tripInfoExpandedPage.geometry.location.lng,
    });

    const searchValue = 'Oma San Francisco Station';
    setTimeout(() => {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${props.tripInfoExpandedPage.place_id}&fields=formatted_phone_number,opening_hours,photos,price_level,types&key=${process.env.REACT_APP_GOOGLE_KEY}`
        )
        .then(res => {
          setPlaceDetails(res.data.result);
          setApiStatus(true);
        })
        .catch(err => {
          console.log(err);
        });
    }, 2000);
  }, []);
  var parsedArr = [];
  const tripThings = JSON.parse(localStorage.getItem('trip-items'));
  const placeParse = () => {
    parsedArr.push(
      props.tripInfoExpandedPage.formatted_address.split(',')[1],
      ' - ',
      props.tripInfoExpandedPage.types[0]
        .toUpperCase()
        .split('_')
        .join(' '),
      ': ',
      props.tripInfoExpandedPage.name
    );
    // console.log('parse arr', parsedArr);
    tripThings.push(parsedArr);
    localStorage.setItem('trip-items', JSON.stringify(tripThings));
    // console.log('NEW local storage', tripThings);
    // console.log('PARSED ARR', parsedArr);
  };

  // console.log('local storage', tripThings);

  console.log('STATE: ', props.tripInfoExpandedPage.place_id);
  // console.log('STATE2: ', coordinates.latMaps, coordinates.lngMaps);
  const MapWithAMarker = withScriptjs(
    withGoogleMap(props => (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: coordinates.latMaps, lng: coordinates.lngMaps }}
      >
        <Marker
          position={{
            lat: coordinates.latMaps,
            lng: coordinates.lngMaps,
          }}
        />
      </GoogleMap>
    ))
  );
  return (
    <div>
      <Row>
        <Col span={10}>
          <MapWithAMarker
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={
              <div
                style={{
                  height: `80vh`,
                  width: '90%',
                }}
              />
            }
            mapElement={
              <div
                className="Google_map"
                style={{
                  height: `100%`,
                }}
              />
            }
          />
          {/* <img className="Google_map" src={mock_google_maps} /> */}
        </Col>

        {apiStatus ? (
          <Col span={14} style={{ paddingLeft: '6vh' }}>
            <Row>
              <h1 style={{ fontSize: '40px' }}>
                {props.tripInfoExpandedPage.name}
              </h1>
            </Row>
            {/* <Row>
              <Input
                style={{ width: '50%' }}
                size="large"
                placeholder="Search"
                prefix={<ArrowRightOutlined />}
              />
            </Row> */}
            <Row style={{ paddingTop: '3vh' }}>
              {placeDetails.photos === undefined
                ? ''
                : placeDetails.photos.map((pht, idx) => {
                    if (idx > 1) {
                      return;
                    } else {
                      return (
                        <Image
                          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${pht.photo_reference}&key=${process.env.REACT_APP_GOOGLE_KEY}`}
                        />
                      );
                    }
                  })}

              {/* <Image
                  src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${placeDetails.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_KEY}`}
                />
                <Image
                  src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${placeDetails.photos[1].photo_reference}&key=${process.env.REACT_APP_GOOGLE_KEY}`}
                /> */}
            </Row>

            <Row style={{ paddingTop: '2vh' }}>
              <h5>
                {props.tripInfoExpandedPage.rating}
                {'   '}
                <Rate
                  disabled
                  allowHalf
                  defaultValue={props.tripInfoExpandedPage.rating}
                />{' '}
              </h5>
            </Row>

            <Row>
              <h6>
                {'\n'}
                {'$'.repeat(
                  parseInt(`${props.tripInfoExpandedPage.price_level}`)
                )}
              </h6>
            </Row>

            {props.tripInfoExpandedPage.opening_hours === undefined ? (
              ''
            ) : props.tripInfoExpandedPage.opening_hours.open_now ? (
              <Row style={{ paddingTop: '1vh' }}>
                <h5 style={{ color: '#25D366' }}>OPEN</h5>
              </Row>
            ) : (
              <Row style={{ paddingTop: '1vh' }}>
                <h5 style={{ color: 'red' }}>CLOSED</h5>
              </Row>
            )}
            <Row>
              <h5>Address: {props.tripInfoExpandedPage.formatted_address}</h5>
            </Row>
            <Row>
              <h5>
                Phone:{' '}
                {placeDetails.formatted_phone_number === undefined
                  ? 'Info unavailable'
                  : placeDetails.formatted_phone_number}
              </h5>
            </Row>
            <Row>
              {props.tripInfoExpandedPage.opening_hours === undefined ? (
                ''
              ) : (
                <Collapse ghost expandIconPosition="right">
                  <Panel
                    style={{
                      fontSize: '20px',
                      fontWeight: '600',
                    }}
                    header="Hours"
                  >
                    {placeDetails.opening_hours.weekday_text.map((res, idx) => {
                      return <p>{res}</p>;
                    })}
                  </Panel>
                </Collapse>
              )}
            </Row>
            <Row>
              <Link to="/manage-trip">
                <Button onClick={() => placeParse()} className="buttonAddTrip">
                  Add to Trip
                </Button>
              </Link>
            </Row>
          </Col>
        ) : (
          <Col span={5} style={{ marginTop: '35vh', textAlign: 'center' }}>
            <Space size="large">
              <Spin size="medium" />
              <Spin size="large" />
              <Spin size="medium" />
            </Space>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default ContentPart;
