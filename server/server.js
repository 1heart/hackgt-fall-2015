

Meteor.setInterval(function() {
	// For every user
	db.locations.find().forEach(function(){
		latitude = this.lat;
		longitude = this.lon;
		id = this.owner;
		// For every vice belonging to the user
		db.vices.find({owner: id}).forEach(function(){
			searchTerms = processTerms(this.text);
			allCurrent = getResults(searchTerms, latitude, longitude).businesses;
			pastLocs = this.past;
			currentLocs = closeCurrent(allCurrent, pastLocs);
			// update 'past' property in vice
			Vices.update({$and: [{owner: id}, {text: this.text}]},{
				past: currentLocs;
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
	for each (business in allCurrent){
		if(business.distance <= 100){
			var time = 0;
			for(pastBusiness in pastLocs){
				if(pastBusiness.name === business.name){
					time = pastBusiness.time + 5;
				}
			}
			current.push({name: business.name, time: time});
		}
	}
}