if (Meteor.isClient) {
  //Geolocation edits
Meteor.setInterval(function() {
  navigator.geolocation.getCurrentPosition(function(position) {
  Session.set('lat', position.coords.latitude);
  Session.set('lon', position.coords.longitude);
      });

      var lat = Session.get('lat');
      var lon = Session.get('lon');
      Locations.insert({
        latitude: lat,
        longitude: lon,
        owner: Meteor.userId(),
        username: Meteor.user().username
      });
  }, 5000);


  Template.body.helpers({
    vices: function() {
      return Vices.find({$or: [{owner: Meteor.userId()}]});
    },
    contact: function() {
      // return Contacts.find({});
      return Contacts.findOne({owner: Meteor.userId()});
    }
  }); 

  Template.body.events({
    "submit .new-vice": function(event) {
      event.preventDefault();

      // Get value from form element
      var text = event.target.text.value;

      // Insert a task into the collection
      Vices.insert({
        text: text,
        createdAt: new Date(), // current time,
        owner: Meteor.userId(),
        username: Meteor.user().username
      });

      // Clear form
      event.target.text.value = "";
    }
  });

  Template.emergencyContact.events({
    "submit .editContact": function(event){
      event.preventDefault();

      var name = event.target.contactName.value;
      var number = event.target.contactNumber.value;

      Meteor.call("addContact", name, number);
 
      event.target.contactName.value = "";
      event.target.contactNumber.value = "";

    }
  });

  Template.vice.events({
    "click .delete": function() {
      Vices.remove(this._id);
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

Vices = new Mongo.Collection("vices");
Locations = new Mongo.Collection("locations");
Contacts = new Mongo.Collection("contacts");

Meteor.methods({
  addContact: function(name, number) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");

    }

    Contacts.update(
        {owner: Meteor.userId()},
        {
          owner: Meteor.userId(),
          username: Meteor.user().username,
          contactName: name,
          contactNumber: number
        },
        {
          upsert: true
        }
      );

  }
});
