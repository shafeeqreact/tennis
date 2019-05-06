import { Mongo } from 'meteor/mongo';

export const Users = Meteor.users;
export const Links = new Mongo.Collection('links');
// export const tableNameData = new Mongo.Collection('tableName');
