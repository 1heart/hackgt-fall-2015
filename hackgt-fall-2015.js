if (Meteor.isClient) {
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


