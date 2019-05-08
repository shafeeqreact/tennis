import { Links } from '/imports/api/collections';

if (Meteor.isServer) {
    Meteor.publish(
      'Links.getAll', function() {
        if(!this.userId){
          return this.ready();
        }
        return Links.find();
      });
    Meteor.methods({
      'links.insert':function (cData){
        let returnId = Links.insert({
          title:cData.title,
          url:cData.url
        });
        return returnId;
      }
    });
  }