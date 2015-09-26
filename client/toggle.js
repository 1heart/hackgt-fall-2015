Meteor.startup(function() {
	$("#update-info").hide();
	setSafe();
});

Template.body.events({
	// Toggles adding/updating info
	"click #toggle-update-info": function(event) {
		$("#update-info").toggle();
	}
});

setDangerous = function() {
	return $("#notification").html("You're screwing up...");
}

setSafe = function() {
	return $("#notification").html("You're good!");
}