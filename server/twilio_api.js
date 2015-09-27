
var twilioAccountSid = 'ACa3c55803e9165d5f2dac961bb3734984'; 
var twilioAuthToken = '51e7ea00fae6c5d3969714bbc0fe8577';
var twilioClient;

Meteor.startup(function() {
	twilioClient = Twilio(twilioAccountSid, twilioAuthToken);
});

Meteor.methods({
	sendWarningMessage: function(naughtyUser, emergencyContactNumber, badPlace) {
		twilioClient.messages.create({ 
			to: emergencyContactNumber, 
			from: "+15102798876", 
			body: "Hey, your friend " + naughtyUser 
			+ " has been to " + badPlace
			 + " for a while now. " + 
			"You might want to check up on him/her.",   
		}, function(err, message) { 
			console.log(message.sid); 
		});
	},
});

// Meteor.call("sendWarningMessage", "Bob", "510-396-6225", "a bar")
