import React from 'react';
import { StaticRoutes } from '/imports/startup/routes/staticRoutes';
//import '/imports/ui/stylesheets/login/loginLayout.scss';

const StaticLayout = (props) => {
  return (
    <div>
      <StaticRoutes />
      {props.children}
    </div>
  );
}
export default StaticLayout;