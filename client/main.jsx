import { Template } from 'meteor/templating';
import './main.html';
import { ReactiveVar } from 'meteor/reactive-var';


clickedImage = String;


Meteor.startup(() => {
    GifBase = new Mongo.Collection('GifBase');
    console.log("> Client side code.");
});

Template.gifDesktop.events({
  'click img': function(event){
    event.preventDefault();
    clickedImage = this.url;
    GifBase.update({_id: GifBase.findOne()._id}, {$set: {selectedImage: clickedImage}});
    console.log(clickedImage);
    console.log(this._id);
  }
});

Template.desktop.events({
    'submit form': function(event){
        event.preventDefault();
        formUrl = document.getElementById('formUrl').value;
        GifBase.insert({url: formUrl, selectedImage: ""});
        console.log("√ Image uploaded.");
    }
});

Template.gifDesktop.events({
  'click a': function(event) {
    event.preventDefault();
    GifBase.remove({_id: this._id});
  }
})

Template.desktop.helpers({
  'gif': function () {
      return GifBase.find();
  }
});

Template.mobiel.helpers({
    'gifLink': function(){
        return GifBase.findOne().selectedImage
    }
});
