import React from 'react';
import {withRouter} from 'react-router-dom';
import {Meteor} from 'meteor/meteor';

const Auth = (props) =>{
  const redirectCheck = ()=>{
    let userData = props.userData;
    if(!Meteor.userId()){
      props.history.push('/login/signin');
      return(null);
    }
    /*if(Meteor.settings.public.emailValidateStatus && Meteor.settings.public.enableEmailDelivery){
      if (!userData.emails[0].verified) {
        props.history.push('/login/emailValidate');
        return(null);
      }
    }*/
    return(null);
  }
  return (
    <React.Fragment>
     {redirectCheck()}
    </React.Fragment>
  );
}
export default withRouter(Auth);