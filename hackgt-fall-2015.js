if (Meteor.isClient) {
  //Geolocation edits
Meteor.setInterval(function() {
  navigator.geolocation.getCurrentPosition(function(position) {
  Session.set('lat', position.coords.latitude);
  Session.set('lon', position.coords.longitude);
      });

      var lat = Session.get('lat');
      var lon = Session.get('lon');
      console.log(lat);
      console.log(lon);
      Locations.insert({
        latitude: lat,
        longitude: lon,
        owner: Meteor.userId(),
        username: Meteor.user().username
      });
  }, 5000);



  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.body.helpers({
    vices: function() {
      return Vices.find({$or: [{owner: Meteor.userId()}]});
    },
    contactName: function() {
      return "myName";
    },
    contactNumber: function() {
      return "myNumber";
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