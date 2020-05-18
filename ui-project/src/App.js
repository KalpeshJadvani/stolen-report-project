import React from 'react';
import './App.css';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import Main from './components/Main';

class App extends React.Component {
  render() {
    return (
      <Layout className="layout main-layout">
        <Navbar />
        <Main />
      </Layout>
    );
  }
}

export default App;
