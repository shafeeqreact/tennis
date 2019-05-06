import React from 'react';
import {StaticRoutes} from '/imports/startup/routes/staticRoutes';
//import '/imports/ui/stylesheets/login/loginLayout.scss';

const StaticLayout = (props) => {
  return (
    <div>
      <div className="container">
        <div className="section" style={{paddingTop: "24px", paddingBottom: "0"}}>
          <div className="columns">
            <div className="column is-5">
              {/* <h1 className="is-size-3 has-text-weight-bold">Winspire</h1> */}
              <img src="/img/logo.svg" alt="Winspire logo" style= {{maxHeight: "40px"}} />
            </div>
          </div>
        </div>
        <div className="section">
                  <StaticRoutes />
                  {props.children}
      </div>
      </div>
      <footer className="footer is-hidden-touch">
        <div className="content has-text-centered">
          <p>
            © 2019 Company Name, Inc., All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
export default StaticLayout;