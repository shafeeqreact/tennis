import React, { Component, PropTypes } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { withRouter, Link } from 'react-router-dom';

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(props){
    //console.log("------------------ VerifyEmail Component Will Mount ------------------------");
    let token = this.props.match.params.token;
    //console.log(token);
    const self = this;
    if(token){
      //Validate the token here
      
      Accounts.verifyEmail(token, (function(error){
        if(error)
        {
          //console.log('error in validating the token');
          //console.log(error);
          self.props.history.push("/login/signin");
          //Bert.alert("Account verification failed. Please check the token, it's either invalid or expired. Please retry", "danger");
        }
        else
        {
          //console.log('successfully validated the token');
          self.props.history.push('/login/upload');
        }
      }
      ));
    }
    else
    {
      //Show an option to the user for sending verification token
      //console.log('send verification token check code');
      let user = Meteor.user();
      //console.log(user);
      if(!user){
        //console.log('user is undefined, hence redirect to sigin page');
        self.props.history.push("/login/signin");
      }
      else if(user.emails[0].verified){
        //console.log('user email is already verified, move him to welcome page');
        self.props.history.push('/login/upload');
      }
      else
      {
        //Keep the user on this page which will show sending verification token option
        //console.log('user is valid but his email is not verified, hence show the sendverification page');
      }
    }

  }

  resendVerificationLink(){
    let user = Meteor.user();
    if(!user){
      this.props.history.push('/login/signin');
    }
    else if(user.emails[0].verified){
      this.props.history.push('/login/upload');
    }
    else{
      Meteor.call("sendVerificationLink",user, function(error,result){
        if(result){
          //Bert.alert("Your account verification token sent.", "success");
        }
      });
    }
  }
  render() {
    return (
        <div>
            <div className="form-group">
              You need to verify your email address before using Winspire App. Check your email inbox or click the button to get the new verification link.
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-success" onClick={this.resendVerificationLink}>Resend verification link</button>
            </div>
            <div>
              <p style={{fontSize: 12}}>Would you like to Signin?<Link to="/signin">&nbsp;&nbsp;&nbsp;Signin</Link></p>
            </div>
        </div>
    );
  }
}

export default withRouter(VerifyEmail);
