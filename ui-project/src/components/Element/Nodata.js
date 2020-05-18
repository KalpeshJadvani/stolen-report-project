import React from 'react';
import { Empty, Layout } from 'antd';

const { Content } = Layout;
const Nodata = (props) => {
  return (
    <Content>
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
        <Empty />
      </div>
    </Content>
  );
};

export default Nodata;
