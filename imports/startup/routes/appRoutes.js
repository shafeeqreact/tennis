import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashHome from '/imports/ui/components/dashboard/dashHome';
import Profile from '/imports/ui/components/users/profile';

export const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/account" exact component={DashHome} /> {/*AccountHome*/}
      <Route path="/account/dashHome" component={DashHome} />
      <Route path="/account/profile" component={Profile} />
      <Route component={DashHome} />
    </Switch>
  );
}