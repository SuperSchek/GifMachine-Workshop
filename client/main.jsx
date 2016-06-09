import { Template } from 'meteor/templating';
import './main.html';

clickedImage = String; // Maakt een globale variabele aan dat een string is. Zonder 'var' is globaal.

Meteor.startup(() => {
    GifBase = new Mongo.Collection('GifBase'); // Maakt collectie aan in de client.
    console.log("> Client side code."); // Deze inhoud komt in de webbrowser console.
});

Template.gifDesktop.events({ // Zet een event op de "Template" "gifDesktop".
    'click img': function(event){ // In het eerste gedeelte definieer je waar het click event op zit.
        event.preventDefault(); // Hiermee zorg je ervoor dat er de pagina niet herlaad.
        clickedImage = this.url; // Zet de URL die geselecteerd is in de variabele.
        GifBase.update({_id: GifBase.findOne()._id}, {$set: {selectedImage: clickedImage}}); // Zet de url in de selectedImage van de geklikte image.
    },
    'click a': function(event) {
        event.preventDefault();
        GifBase.remove({_id: this._id}); // Verwijdert het gifje uit de database.
    }
});

Template.desktop.events({
    'submit form': function(event){ // Als je een formulier wilt verzenden moet het event altijd op een form submit zitten.
        event.preventDefault();
        formUrl = document.getElementById('formUrl').value; // De waarde die is ingevuld in de textfield wordt in een variabele opgeslagen.
        GifBase.insert({url: formUrl, selectedImage: ""}); // De variabele wordt in de database onder "url" opgeslagen, daarnaast wordt er een lege selectedValue aangemaakt.
        console.log("√ Image uploaded.");
    }
});

Template.desktop.helpers({
  'gif': function () {
      return GifBase.find(); // Als we in de template {{gif}} opvragen wordt de inhoudt van GifBase gereturned.
  }
});


Template.mobiel.helpers({
    'gifLink': function(){
        return GifBase.findOne().selectedImage // Als we in de template {{gifLink}} opvragen wordt de inhoudt van de selectedImage uit de database gereturned. Omdat dit er maar 1 is wordt de findOne gebruikt.
    }
});
