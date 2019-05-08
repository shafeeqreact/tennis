import React from 'react';
import { LoginRoutes } from '/imports/startup/routes/loginRoutes';

const LoginLayout = (props) => {
  if (Meteor.userId()) {
    props.history.push('/account');
    return null;
  }

  return (
    <React.Fragment>
      <LoginRoutes />
    </React.Fragment>
  );
}

export default LoginLayout;