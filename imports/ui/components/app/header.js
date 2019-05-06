import React, { useContext } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { AppContext } from '/imports/api/contexts/contexts';

const Header = (props) => {

  const userLogout = () => {
    Meteor.logout();
    props.history.replace('/login/signin');
  }

  const context = useContext(AppContext);
  let userData = context.currentUser;
  let firstName = (userData && userData.profile && userData.profile.fname) ? userData.profile.fname : "";
  let helloMessage = <span>{firstName}</span>;

  return (
    <div>
      <nav className="navbar navbar-light bg-light" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <NavLink to="/account/dashHome" className="navbar-item">
            Company Logo
            </NavLink>
        </div>
        <ul className="nav navbar-nav navbar-left">
          <li><NavLink to="/account/dashHome" className="nav-link" activeClassName="nav-link"><p className="text has-text-primary">Dashboard</p></NavLink></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown" href="#">{helloMessage}
              <span className="caret"></span></a>
            <ul className="dropdown-menu">
              <li><NavLink className="dropdown-item" to="/account/profile" activeClassName="nav-link">My Profile</NavLink></li>
              <li><NavLink className="dropdown-item" to="/account/dashHome" activeClassName="nav-link">My Dashboard</NavLink></li>
              <li><NavLink className="dropdown-item" to="/account/dashHome" activeClassName="nav-link">My Link</NavLink></li>
              <li><NavLink className="dropdown-item" to="#" onClick={() => userLogout()}>Log Out</NavLink></li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default withRouter(Header);