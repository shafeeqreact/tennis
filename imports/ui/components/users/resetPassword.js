import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Accounts } from 'meteor/accounts-base';
import { withRouter } from 'react-router-dom';

// App component - represents the whole Reset Password app
class ResetPassword extends Component {
  constructor(props) {
    super(props);
  }

  // Handle the ResetPassword submit event
  resetPasswordSubmit(event, t) {
    event.preventDefault();
    let token = this.props.match.params.token;
    const newPassword = ReactDOM.findDOMNode(this.refs.newResetPassword).value;
    const newConfirmPassword = ReactDOM.findDOMNode(this.refs.confirmResetPassword).value;
    const self = this;
    if(newPassword == '' || newConfirmPassword == '') {
      //Bert.alert("Please enter both the passwords to reset.", "danger");
    } else if(newPassword !== newConfirmPassword) {
      //Bert.alert("Password mismatch. Please enter the same passwords.", "danger");
    } else if (newPassword !== '' && newConfirmPassword !== '' && newPassword === newConfirmPassword) {
      Accounts.resetPassword(token, newPassword, function(error) {
        if (error) {
          console.log(error);
          //Bert.alert("Reset password failed. We are sorry but something went wrong. Please retry forgot password again.", "danger");
          self.props.history.push({pathname: '/forgot'});
        } else {
          console.log('Your password has been changed. Welcome back!');
          //Bert.alert("Your password has been changed. Welcome back!", "success");
          self.props.history.push({pathname: '/login/signin'});
        }
      });
    }
    else {
      console.log('We are sorry but something went wrong.');
      //Bert.alert("Reset password failed. We are sorry but something went wrong. Please retry", "danger");
    }
    return false;
  }

  render() {
    return (
      <div>
        <p>Please enter your new password</p>
        <form id="resetPasswordForm" onSubmit={this.resetPasswordSubmit.bind(this)}>
          <div className="form-element" style={{margin: "16px 0"}}>
            <div className="form-element__control">
              <input ref="newResetPassword" className="input" placeholder="New Password" type="password" />
            </div>
          </div>
          <div className="form-element" style={{margin: "16px 0"}}>
            <div className="form-element__control">
              <input ref="confirmResetPassword" className="input" placeholder="Confirm Password" type="password" />
            </div>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-success">Reset Password</button>
          </div>
        </form>
      </div>
    );
  }
}
export default withRouter(ResetPassword);