import React from 'react';
import { IndexRoutes } from '/imports/startup/routes/indexRoutes';

const IndexLayout = (props) => {
    if (Meteor.userId()) {
        props.history.push('/account');
        return null;
    }

    return (
        <IndexRoutes />
    );
}

export default IndexLayout;