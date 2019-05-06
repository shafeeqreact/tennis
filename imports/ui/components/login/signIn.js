import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

const SignIn = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [errorStatus, setErrorStatus] = useState(false);

  const loginFormSubmit = (event) => {
    event.preventDefault();
    if (userName && password) {
      Meteor.loginWithPassword(userName, password, function (error) {
        if (error) {
          setErrorStatus(true);
        }
        else {
          props.history.replace('/account/dashHome');
        }
      });
    }
  }

  return (
    <div className="row" >
      <div className="widthlimit container text-center position-relative">
        <div className="p-0 m-0">
          <form id="loginForm" onSubmit={(e) => loginFormSubmit(e)} className="p-0 m-0" method="post">
            <h3 className="mobiletitle title black font-weight-bold">Log in to your account</h3>
            <div className="p-0 mx-0 col-12 mt-0 mt-sm-4">
              <label className=" w-100">
                <label htmlFor="username" className="sr-only">Enter your email address or username</label>
                <div className="input-group">
                  <div className="input-group-prepend d-none d-sm-flex">
                    <div className="bg-white input-group-text text-secondary font-weight-bold">
                      <i className="bigsentence py-0 icon-user"></i>
                    </div>
                  </div>
                  <input type="text" autoFocus className="d-block form-control lightfield sentence" name="username"
                    id="username" placeholder="Email or Username"
                    onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div className="ml-1">
                  <label htmlFor="username" className="text-left p-0 m-0 error-class" generated="true">
                    {errorStatus ? 'Invalid email or password.' : ""}
                  </label>
                </div>
              </label>
            </div>
            <div className="p-0 mx-0 mt-0 mt-sm-3 col-12">
              <label className="w-100">
                <label htmlFor="password" className="sr-only">Enter your password</label>
                <div className="input-group">
                  <div className="input-group-prepend d-none d-sm-flex">
                    <div className="bg-white input-group-text text-secondary font-weight-bold">
                      <i className="bigsentence py-0 icon-lock"></i>
                    </div>
                  </div>
                  <input type={showPassword === true ? "text" : "password"}
                    className="login-field-password border-right-0 form-control lightfield sentence" name="password"
                    id="password" placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)} />
                  <div className="input-group-prepend">
                    <div className="bg-white input-group-text text-primary">
                      <div className="sentence" style={{ cursor: 'pointer' }} onClick={() => setShowPassword(!showPassword)}>
                        {showPassword === true ? "Hide" : "Show"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ml-1">
                  <label htmlFor="password" className="text-left p-0 m-0 error-class" generated="true"></label>
                </div>
              </label>
              <input className="border-0 font-weight-bold btn-secondary mt-0 mt-sm-3 actiontext btn-lg btn-block"
                type="submit" value="Log In" disabled={!(userName && password)} />
              <span className="p-0 textcta semibold sentence">
                <Link to="/login/forgot">Forgot your password?</Link>
              </span>
              <span className="p-0 textcta2 semibold sentence">
                New to Voozlr? <Link className="newsignup" to="/login/signup">Sign up</Link>
              </span>
            </div>
          </form>
        </div>
      </div >
    </div>
  );
}

export default SignIn;