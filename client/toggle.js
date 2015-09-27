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
	$("#notification-safe").hide();
	$("#notification-dangerous").show();
	
	if (Meteor.isCordova) {
	  navigator.vibrate([1000, 1000, 1000]);

	}
}

setSafe = function() {
	$("#notification-dangerous").hide();
	$("#notification-safe").show();
}