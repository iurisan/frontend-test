import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignIn from '../components/SignIn';
import PatientList from '../components/PatientList';
import PrivateRoute from './PrivateRoute';

const Routes = () => (
  <Switch>
    <Route exact path="/signin" component={SignIn} />
    <PrivateRoute exact path="/" component={PatientList} />
  </Switch>
);

export default Routes;
