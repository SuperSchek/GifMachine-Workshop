import { Meteor } from 'meteor/meteor';

GifBase = new Mongo.Collection('GifBase'); // Maakt collectie aan in de server.

Meteor.startup(() => {
  console.log("> Server side code."); // Deze inhoud komt in de terminal.
});
