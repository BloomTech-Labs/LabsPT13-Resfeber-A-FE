import React from 'react';
import './content_part.css';
import CustomCard from './CustomCard';
import { Row, Col } from 'antd';
import mock_google_maps from '../../../images/mock_google_maps.png';
import restarantpicsample from '../../../images/restaurantpicsample.png';

import { Input } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
const ContentPart = () => {
  return (
    <div>
      <Row>
        <Col span={10}>
          <img className="Google_map" src={mock_google_maps} />
        </Col>
        <Col span={14} style={{ paddingLeft: '6vh' }}>
          <Row>
            <h1 style={{ fontSize: '40px' }}>Abc Restaurant</h1>
          </Row>
          <Row>
            <Input
              style={{ width: '50%' }}
              size="large"
              placeholder="Search"
              prefix={<ArrowRightOutlined />}
            />
          </Row>
          <Row style={{ paddingTop: '6vh' }}>
            <img className="restaurantPic" src={restarantpicsample} />
          </Row>
          <Row style={{ paddingTop: '2vh' }}>
            <h5>5.0 ⭐⭐⭐⭐⭐ </h5>

            {/* <CustomCard />
            <CustomCard />
            <CustomCard />
            <CustomCard />
            <CustomCard />
            <CustomCard />
            <CustomCard />
            <CustomCard /> */}
          </Row>

          <Row>
            <h6>{'\n'}$$$$ American Restaurant</h6>
          </Row>
          <Row style={{ paddingTop: '2vh' }}>
            <h5>Address: Lorem Ipsum 99999</h5>
          </Row>
          <Row>
            <h5>Hours: Open 9AM - 9PM</h5>
          </Row>
          <Row>
            <h5>Phone: (999) 999-999</h5>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ContentPart;
