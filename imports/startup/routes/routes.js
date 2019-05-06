import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import IndexLayout from '../../ui/components/layouts/indexLayout';
import AppLayout from '/imports/ui/components/layouts/appLayout';
import LoginLayout from '/imports/ui/components/layouts/loginLayout';
import StaticLayout from '/imports/ui/components/layouts/staticLayout';

// route components
export const renderRoutes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact render={(props) => <IndexLayout {...props} />} />
      <Route path="/account" render={(props) => <AppLayout {...props} />} />
      <Route path="/login" render={(props) => <LoginLayout {...props} />} />
      <Route path="/static" render={(props) => <StaticLayout {...props} />} />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  </BrowserRouter>
);
