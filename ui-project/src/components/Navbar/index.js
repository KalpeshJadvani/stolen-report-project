import React, { Component } from 'react';
import { PageHeader } from 'antd';
import RightMenu from './RightMenu';
import { Link } from 'react-router-dom';
export default class NaveBar extends Component {
  render() {
    return (
      <PageHeader style={{ padding: '0 0px' }}>
        <br /> <br />
        <nav className="menuBar">
          <div className="logo">
            <Link to="/">logo</Link>
          </div>
          <div className="menuCon">
            <div className="rightMenu">
              <RightMenu />
            </div>
          </div>
        </nav>
      </PageHeader>
    );
  }
}
