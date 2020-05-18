import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard';
import Complain from '../Pages/Complain';
import Policeofficers from '../Pages/Policeofficers';
import NotFound from '..//Element/Nodata';
// import Profile from './components/Profile';

export default function Main() {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/complain" component={Complain} />
      <Route path="/policeofficers" component={Policeofficers} />

      <Route component={NotFound} />
      {/* Finally, catch all unmatched routes */}
    </Switch>
  );
}
