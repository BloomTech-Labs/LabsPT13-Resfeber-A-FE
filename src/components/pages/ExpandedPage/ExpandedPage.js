import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
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

  console.log(collapsed_toggle);
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed_toggle}>
        <div className="logo">
          <img src={resferber_logo} />
        </div>
        <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed_toggle ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: toggleSlider,
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: '90vh',
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};

export default ExpandedPage;
