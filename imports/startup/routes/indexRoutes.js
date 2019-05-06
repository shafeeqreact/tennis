import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from '../../ui/components/app/mainPage';

export const IndexRoutes = () => {
    return (
        <Switch>
            <Route path="/" exact component={MainPage} />
            <Route component={MainPage} />
        </Switch>
    );
}
