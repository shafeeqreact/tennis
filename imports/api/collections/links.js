import { Links } from '/imports/api/collections';

if (Meteor.isServer) {
    Meteor.publish(
      'Links.functionName', function() {
        if(!this.userId){
          return this.ready();
        }
      });
    Meteor.methods({
      'links.functionName':function (cData){
        return returnId;
      }
    });
  }