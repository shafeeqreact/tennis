import { Meteor } from 'meteor/meteor';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Users } from '/imports/api/collections/';
import { AppContext } from '/imports/api/contexts/contexts';
import Auth from '/imports/ui/components/app/auth';
import { AppRoutes } from '/imports/startup/routes/appRoutes';

const AppLayout = (props) => {
  let data = {};
  data.currentUser = props.currentUser;
  console.log('appLayout.js data - ', data)
  if (!props.loading) {
    return (
      <div>Loading...</div>
    );
  }
  return (
    <AppContext.Provider value={data}>
      <React.Fragment>
        <Auth userData={data.currentUser} />
        <AppRoutes />
      </React.Fragment>
    </AppContext.Provider>
  );
}

export default withTracker(() => {
  let handleUser = Meteor.subscribe('Users.current');
  let user = handleUser.ready() ? Users.findOne() : "";
  return {
    currentUser: user ? user : {},
    loading: handleUser.ready()
  };
})(AppLayout);