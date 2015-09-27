if (Meteor.isClient) {
  //Geolocation edits


Meteor.setInterval(function() {
  navigator.geolocation.getCurrentPosition(function(position) {


  Session.set('lat', position.coords.latitude);
  Session.set('lon', position.coords.longitude);
      });

      var lat = Session.get('lat');
      var lon = Session.get('lon');
      
      Locations.update({_id: Meteor.userId()}, {
        _id: Meteor.userId(),
        latitude: lat,
        longitude: lon,
        owner: Meteor.userId(),
        username: Meteor.user().username
      }, {upsert: true});
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
        username: Meteor.user().username,
        past: []
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


  // For push notifications
  // serverMessages.listen('serverMessage:info', function (subject, message, options) {
  //   Notifications.info(subject, message, options);
  // });

  // serverMessages.listen('serverMessage:warning', function (subject, message, options) {
  //   Notifications.warn(subject, message, options);
  // });

  // serverMessages.listen('serverMessage:success', function (subject, message, options) {
  //   Notifications.success(subject, message, options);
  // });

  // serverMessages.listen('serverMessage:error', function (subject, message, options) {
  //   Notifications.error(subject, message, options);
  // });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
  });
}

Vices = new Mongo.Collection("vices");
Locations = new Mongo.Collection("locations");
Contacts = new Mongo.Collection("contacts");

// For push notifications
// serverMessages = new ServerMessages();

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

  },

  getResults: function(searchterm, lat, lon) {
    result =  Meteor.call("searchYelp", searchterm, "", lat, lon, 1000);
    return result;
  }
});

