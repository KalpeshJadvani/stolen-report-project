import React, { Component } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

export default class RightMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLogin: false,
    };
  }
  render() {
    return (
      <Menu mode="horizontal">
        <Menu.Item key="dashboard">
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="complain">
          <Link to="/complain">Reg Lost Report</Link>
        </Menu.Item>
        <Menu.Item key="policeofficers">
          <Link to="/policeofficers">Police officers</Link>
        </Menu.Item>
      </Menu>
    );
  }
}
