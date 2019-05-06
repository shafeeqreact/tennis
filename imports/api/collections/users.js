import { Users } from '/imports/api/collections';

if (Meteor.isServer) {
  Meteor.publish('Users.getById', function (cData) {
    if (!this.userId) {
      return this.ready();
    }
    let data = {};
    if (cData && cData.userId) {
      data._id = cData.userId ? cData.userId : this.userId;
    }

    return Users.find(data, { fields: { _id: 1, profile: 1, jsettings: 1 } });
  });
  Meteor.publish("Users.current", function () {
    if (this.userId) {
      let user = Users.find({ _id: this.userId },
        { fields: { 'services': 1, 'createdAt': 1, 'profile': 1, 'jSettings': 1 } });
      return user;
    } else {
      this.ready();
    }
  });
  Meteor.publish("getAllUsers", function () {
    let getUsers = Meteor.users.find({ "profile.avatarUrl": { $exists: true } });
    return getUsers;
  });

}

// Page for all the server methods of Login module
Meteor.methods({
  // Server method used for registering a new user With No Role
  createUserNotValidated: function (cdata) {
    var id = Accounts.createUser({
      email: cdata.email,
      password: cdata.password,
      jSettings: {

      },
      profile: {
        step: cdata.step,
        city: cdata.city,
        state: cdata.state
      }
    });
    return id;
  },

  profileUpdate: function (cdata) {
    if (this.userId) {
      Meteor.users.update(this.userId, {
        $set: {
          account: cdata.account,
          roles: cdata.roles,
          fullname: cdata.fullname,
          username: cdata.username,
          gender: cdata.gender,
          dobmonth: cdata.dobmonth,
          dobday: cdata.dobday,
          dobyear: cdata.dobyear,
          relationship: cdata.relationship,
          relationshipselect: cdata.relationshipselect,
          birthdayselect: cdata.birthdayselect,
          userselect: cdata.userselect
          // "profile.displayName": displayName,
          // "profile.title": title,
          // "profile.location": location,
          // "profile.region": region,
          // "profile.country": country,
          // "profile.company": company,
          // "profile.websiteUrl": websiteUrl,
          // "profile.winspireMission": winspireMission,
          // "profile.emailNotificationsFlag": emailNotificationsFlag,
          // "profile.mentor": mentorFlag
        }
      }, (error) => {
        console.log('profileUpdate error - ', error)
      });
    }
    else {
      console.log("userId is empty: " + this.userId);
    }
  },

  //Suresh Profile image web url and cloudinary public id Stroing in Users Collections
  profileImageUpdate: function (profileImageUrl, profilePublicId) {
    if (this.userId) {
      Meteor.users.update(this.userId, {
        $set: {
          "profile.avatarUrl": profileImageUrl,
          "profile.cloudPublicId": profilePublicId
        }
      });
    }
  },
  profileMissionUpdate: function (winspireMission) {
    if (this.userId) {
      Meteor.users.update(this.userId, {
        $set: {
          "profile.winspireMission": winspireMission
        }
      });
    }
  },
  profileDisplayNameUpdate: function (displayName) {
    if (this.userId) {
      Meteor.users.update(this.userId, {
        $set: {
          "profile.displayName": displayName
        }
      });
    }
  },
  profileWebTourStatus: function (pageCode) {
    if (this.userId) {
      let updateField = "";
      switch (pageCode) {
        case 'courseHome':
          updateField = { "profile.webTourPages.courseHome": true };
          break;
        case 'courseDetails':
          updateField = { "profile.webTourPages.courseDetails": true };
          break;
        case 'communityScreen':
          updateField = { "profile.webTourPages.communityScreen": true };
          break;
        case 'commScreenLike':
          updateField = { "profile.webTourPages.commScreenLike": true };
          break;
        case 'AAAScreen':
          updateField = { "profile.webTourPages.AAAScreen": true };
          break;
        case 'comSave':
          updateField = { "profile.webTourPages.comSave": true };
          break;
        case 'AAASave':
          updateField = { "profile.webTourPages.AAASave": true };
          break;
      }
      if (updateField !== "")
        Meteor.users.update(this.userId, {
          $set: updateField
        });
    }
  },
  profileHideUserAvatarUpdate: function (courseId, anonymousFlag) {
    if (!anonymousFlag) {
      anonymousFlag = false;
    }
    let hideUserAvatar = {};
    hideUserAvatar[`profile.hideUserAvatar.${courseId}`] = anonymousFlag;
    Meteor.users.update(this.userId, {
      $set: hideUserAvatar
    });
  },
  sendVerificationLink: function (user) {
    Meteor.setTimeout(function () {
      Accounts.sendVerificationEmail(user._id, user.emails[0].address);
    }, 2 * 1000);
    return true;
  }

  /*cloudinaryDestroy: function (public_id) {
    const CloudinaryServer = require('cloudinary');
        CloudinaryServer.config({
        cloud_name: 'winspire-inc',
        api_key: '241388283296115',
        api_secret: 'f8WBid2why1ckuPKNPTvYn2-cTA'
        });
        //CloudinaryServer.v2.api.resource(public_id,function(error, result){console.log(result)});
        CloudinaryServer.v2.uploader.destroy(public_id, function(error,result){console.log(result);});
    }*/
});

if (Meteor.isServer) {
  Meteor.methods({
    'users.updateProfile'(cData) {
      if (!this.userId) {
        return "You have to login first";
      }
      let retId = "";
      let fname = cData.fname ? cData.fname : "";
      let phoneNumber = cData.phoneNumber ? cData.phoneNumber : "";
      let location = cData.location ? cData.location : "";
      let aboutMe = cData.aboutMe ? cData.aboutMe : "";
      if (cData) {
        retId = Users.update(this.userId, {
          $set: {
            "profile.fname": fname,
            "profile.phoneNumber": phoneNumber,
            "profile.location": location,
            "profile.aboutMe": aboutMe
          }
        });
      }
      return retId;
    },
    'users.updateProfileImage': function (cloudinaryInfo) {
      if (this.userId) {
        let profileImageUrl = cloudinaryInfo.secure_url;
        let profilePublicId = cloudinaryInfo.public_id;
        if (profileImageUrl && profilePublicId) {
          Users.update(this.userId, {
            $set: {
              "profile.profileUrl": profileImageUrl,
              "profile.cloudPublicId": profilePublicId
            }
          });
        }
      }
    }
  });
}
/* Cloudinary Return Variables */

/*
access_mode: "public"
bytes: 12168
coordinates: {faces: Array(0)}
created_at: "2018-11-28T02:13:42Z"
etag: "9f212c4e21f9294b2484cb1846adf7e6"
faces: []
format: "jpg"
height: 200
original_filename: "IMG_8707-1"
pages: 1
path: "v1543371222/Win/profile/i0ezsapwr2flrfyosuhm.jpg"
placeholder: false
public_id: "Win/profile/i0ezsapwr2flrfyosuhm"
resource_type: "image"
secure_url: "https://res.cloudinary.com/winspire-inc/image/upload/v1543371222/Win/profile/i0ezsapwr2flrfyosuhm.jpg"
signature: "a304214c16991c8c721ec3c9fb2927725e4e04ff"
tags: []
thumbnail_url: "https://res.cloudinary.com/winspire-inc/image/upload/c_limit,h_60,w_90/v1543371222/Win/profile/i0ezsapwr2flrfyosuhm.jpg"
type: "upload"
url: "http://res.cloudinary.com/winspire-inc/image/upload/v1543371222/Win/profile/i0ezsapwr2flrfyosuhm.jpg"
version: 1543371222
width: 200
*/