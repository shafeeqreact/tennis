import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from '/imports/ui/App';

export const IndexRoutes = () => {
    return (
        <Switch>
            <Route path="/" exact component={App} />
            <Route component={App} />
        </Switch>
    );
}
