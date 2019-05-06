import { Accounts } from 'meteor/accounts-base';

Accounts.config({
  sendVerificationEmail: Meteor.settings.public.enableEmailDelivery?Meteor.settings.public.enableEmailDelivery:false,
  forbidClientAccountCreation: false
});

Accounts.onLogin(function(options) {
  //console.log("onLogin");

  // Meteor.users.update({ _id: options.user._id }, {
  //   $set: { lastActiveAt: new Date() }
  // });
  //var Router = require('react-router');
  //Router.browserHistory.push('/');
  //console.log("user last active updated "+new Date());
});

Accounts.onCreateUser(function(options, user) {
    if (user.profile == undefined) user.profile = {};

    if (user.services != null && user.services.facebook !== undefined) {
     user.profile.fname = user.services.facebook.first_name;
     user.profile.lname = user.services.facebook.last_name;
     user.profile.email = user.services.facebook.email;
     //console.log(user.services.facebook);
    }else if (user.services != null && user.services.google !== undefined) {
      if(user.services.google.given_name!= null && user.services.google.given_name.length>0){
        user.profile.fname = user.services.google.given_name;
        user.profile.lname = user.services.google.family_name;
      }else{
        if(user.profile.name!=null && user.profile.name.indexOf(' ')>0){
          user.profile.fname = user.name.split(' ')[0];
          user.profile.lname = user.name.split(' ')[0];
        }else{
          user.profile.fname = user.services.google.email;
        }
      }
      user.profile.email = user.services.google.email;
      //console.log(user.services.google);
    }else if (user.services != null && user.services.twitter !== undefined) {
      if(user.profile.name!=null && user.profile.name.indexOf(' ')>0){
        user.profile.fname = user.name.split(' ')[0];
        user.profile.lname = user.name.split(' ')[0];
      }else{
        user.profile.fname = user.services.twitter.screenName;
      }
      user.profile.email = user.services.twitter.email;
     //console.log(user.services.twitter);
    }else if (user.services != null && user.services.linkedin !== undefined) {
      if(user.profile.firstName!=null){
        user.profile.fname = user.name.firstName;
        user.profile.lname = user.name.lastName;
      }else{
        user.profile.fname = user.services.linkedin.firstName;
      }
      user.profile.email = user.services.linkedin.email;
     //console.log(user.services.twitter);
   }else{//winspire account user
     //console.log(user.profile);
     if( user.emails && Array.isArray(user.emails) && user.emails[0] )
        user.profile.email = user.emails[0].address;
    }
    if(user && user.emails && user.emails[0]){
      if(Meteor.settings.public.enableEmailDelivery){
        Meteor.setTimeout(function() {
          Meteor.call("sendVerificationLink",user);
        }, 2 * 1000);
      }
    }
    //console.log("onCreateUser");
    //console.log(user);
    return user;
});
