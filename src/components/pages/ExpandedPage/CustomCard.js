import React from 'react';
import { Card } from 'antd';
const CustomCard = () => {
  const { Meta } = Card;
  return (
    <div style={{ marginRight: '4vh', paddingTop: '2vh' }}>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            alt="example"
            src="https://images.unsplash.com/photo-1534050359320-02900022671e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          />
        }
      >
        <Meta title="Cable Car Ticket" description="$7" />
      </Card>
    </div>
  );
};

export default CustomCard;
