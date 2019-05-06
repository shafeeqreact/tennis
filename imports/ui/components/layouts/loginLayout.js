import React from 'react';
import { LoginRoutes } from '/imports/startup/routes/loginRoutes';
import Navbar from '../general/navbar';

const LoginLayout = (props) => {
  if (Meteor.userId()) {
    props.history.push('/account');
    return null;
  }

  return (
    <div className="bg-light">
      <div style={{ height: '85vh' }}>
        <div className="row h-100 text-center">
          <div className="table col-sm-12 h-100 d-table">
            <div className="d-table-cell table-cell align-middle container">
              <Navbar />
              <LoginRoutes />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginLayout;