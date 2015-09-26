

if (Meteor.isServer){


	Meteor.setInterval(function(){
		db.locations.find().forEach(function(){
			

		});
	}, 5000);


}