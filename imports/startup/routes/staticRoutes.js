import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Terms from '/imports/ui/components/general/terms';
import Privacy from '/imports/ui/components/general/privacy';
export const StaticRoutes = () => {
  return(
    <Switch>
      <Route path="/static/terms" component={Terms}/>
      <Route path="/static/privacy" component={Privacy}/>
      <Route component={Terms} />
    </Switch>
  );
}
