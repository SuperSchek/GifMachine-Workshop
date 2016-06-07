import { Meteor } from 'meteor/meteor';

GifBase = new Mongo.Collection('GifBase');

Meteor.startup(() => {
  console.log("> Server side code.");
  // code to run on server at startup
});
