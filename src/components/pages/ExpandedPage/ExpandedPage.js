import React, { useState } from 'react';
import ContentPart from './ContentPart';
import 'antd/dist/antd.less';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Icon from '@ant-design/icons';
import {
  CompassOutlined,
  HeartOutlined,
  CarOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import './expanded_page.css';
import resferber_logo from '../../../images/Logo.png';

const ExpandedPage = () => {
  const { Header, Sider, Content } = Layout;
  const [collapsed_toggle, setCollapse_toggle] = useState(false);
  function toggleSlider() {
    if (collapsed_toggle) {
      setCollapse_toggle(false);
    } else {
      setCollapse_toggle(true);
    }
  }

  // const ItenaryIcon = props => <Icon component={ItenarySvg} />;
  return (
    <>
      <Layout>
        <Sider
          theme="light"
          trigger={null}
          collapsible
          collapsed={collapsed_toggle}
          onCollapse={toggleSlider}
        >
          <div className="logo">
            <Link to="/">
              {' '}
              <img src={resferber_logo} />{' '}
            </Link>
          </div>
          <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<CompassOutlined />}>
              Explore
            </Menu.Item>
            <Menu.Item key="2" icon={<HeartOutlined />}>
              Favorites
            </Menu.Item>
            <Menu.Item key="3" icon={<InboxOutlined />}>
              Itinerary
            </Menu.Item>
            <Menu.Item key="4" icon={<CarOutlined />}>
              Transport
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          {/* <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed_toggle ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: toggleSlider,
            }
          )}
        </Header> */}
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: '92vh',
            }}
          >
            <ContentPart />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default ExpandedPage;
