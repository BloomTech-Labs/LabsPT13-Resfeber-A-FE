import React from 'react';
import './content_part.css';
import CustomCard from './CustomCard';
import { Row, Col } from 'antd';
import mock_google_maps from '../../../images/mock_google_maps.png';

import { Input } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
const ContentPart = () => {
  return (
    <div>
      <Row>
        <Col span={7}>
          <img className="Google_map" src={mock_google_maps} />
        </Col>
        <Col span={17}>
          <Row>
            <h1 style={{ fontSize: '40px', paddingLeft: '6vh' }}>
              San Francisco
            </h1>
          </Row>
          <Row style={{ paddingLeft: '6vh' }}>
            <Input
              style={{ width: '50%' }}
              size="large"
              placeholder="Search in San Francisco"
              prefix={<ArrowRightOutlined />}
            />
          </Row>
          <Row style={{ paddingLeft: '6vh' }}>
            <CustomCard />
            <CustomCard />
            <CustomCard />
            <CustomCard />
            <CustomCard />
            <CustomCard />
            <CustomCard />
            <CustomCard />
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ContentPart;
