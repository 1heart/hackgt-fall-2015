

Meteor.setInterval(function() {
	// For every user
	Locations.find().forEach(function(location){
		latitude = location.latitude;
		longitude = location.longitude;
		id = location.owner;
		console.log(Vices.find({owner: id}).length);
		// For every vice belonging to the user
		var vices = Vices.find({owner: id});
		Object.keys(vices).forEach(function(key){
			vice = vices[key];
			console.log(vice);
			searchTerms = processTerms(vice.text);
			console.log(searchTerms);
			allCurrent = Meteor.call("getResults",searchTerms, latitude, longitude).businesses;
			pastLocs = vice.past;
			currentLocs = closeCurrent(allCurrent, pastLocs);
			// update 'past' property in vice
			Vices.update({$and: [{owner: id}, {text: vice.text}]},{
				past: currentLocs
			})
		});

	});

}, 5000);

// Replaces spaces with + signs
var processTerms = function(term){
	var termArr = term.split(" ");
	var processed = "";
	for(var i=0; i<termArr.length-1; i++){
		processed += termArr[i] + "+";
	}
	processed += termArr[termArr.length-1];
}


// Returns an array of current nearby locations with updated times
var closeCurrent = function(allCurrent, pastLocs){
	current = [];
	console.log("New locations:");
	for (business of allCurrent){
		if(business.distance <= 100){
			var time = 0;
			for(pastBusiness in pastLocs){
				if(pastBusiness.name === business.name){
					time = pastBusiness.time + 5;
				}
			}
			current.push({name: business.name, time: time});
			console.log("Name: " + business.name + "   " + "Time Spent: " + time);
		}
	}
}