import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';

// App component - represents the whole Forgot Password app
class ForgotPassword extends Component {
  constructor(props) {
    super(props);
  }

  // Handle the ForgotPassword submit event
  forgotPasswordSubmit(event, t) {
      event.preventDefault();

      let email = ReactDOM.findDOMNode(this.refs.forgotPasswordEmail).value.toLowerCase();

      Accounts.forgotPassword({email: email}, function(error) {
        if (error) {
          $(".alert").hide();
          if (error.message === 'User not found [403]') {
            $(".alert-error").hide();
            $(".alert-doesnot-exist").show();
          }
          else {
            $(".alert-doesnot-exist").hide();
            $(".alert-error").show();
          }
        }
        else {
          $(".alert-error").hide();
          $(".alert-doesnot-exist").hide();
          $(".alert").show();
        }
      });
      return false;
  }

  render() {
    return (
        <div>
          <div className="alert-error alert-danger" style={{display: 'none'}}>We are sorry but something went wrong.</div>
          <div className="alert-doesnot-exist alert-danger" style={{display: 'none'}}>This email does not exist.</div>
          <div className="alert alert-success" style={{display: 'none'}}>We have sent a link to your email to reset your password, please check your inbox.</div>
          <p>To receive an email with instructions on how to reset your password, please enter your email address.</p>
          <form id="forgotPasswordForm" onSubmit={this.forgotPasswordSubmit.bind(this)}>
            <div className="form-element" style={{margin: "16px 0"}}>
              <div className="form-element__control input-has-icon">
                <label className="form-element__label" htmlFor="forgotPasswordEmail">Email</label>
                <span className="input__icon icon">
                  
                </span>
                <input type="email" className="input" ref="forgotPasswordEmail" placeholder="Enter your email" />
              </div>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-success">Reset Password</button>
            </div>
            <div>
              <p style={{fontSize: 12}}>Would you like to Sign in?&nbsp;&nbsp;&nbsp;<Link to="/login/signin" className="text underline">Sign in</Link></p>
            </div>
          </form>
        </div>
    );
  }
}

export default ForgotPassword;
