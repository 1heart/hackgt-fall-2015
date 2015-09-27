
Meteor.setInterval(function() {
	// For every user
	Locations.find({}).forEach(function(location){
		latitude = location.latitude;
		longitude = location.longitude;
		id = location.owner;
		name = location.username;
		// console.log(latitude);
		// console.log(longitude);
		// console.log(id);
		v = Vices.find({owner: id});
		// console.log(id);
		v.forEach(function(vice){
			searchTerms = processTerms(vice.text);
			console.log(searchTerms);
			allCurrent = Meteor.call("getResults", searchTerms, latitude, longitude).businesses;
			pastLocs = vice.past;
			currentLocs = closeCurrent(allCurrent, pastLocs);
			// console.log(currentLocs);
			Vices.update({$and: [{owner: id}, {text: vice.text}]},{
				text: vice.text,
				createdAt: vice.createdAt,
				owner: vice.owner,
				username: vice.username,
				past: currentLocs
			});
			makeAlert(currentLocs, id, name, vice.text);
		});

// 	});

// }, 5000);


// Replaces spaces with + signs
var processTerms = function(term){
	var termArr = term.split(" ");
	var processed = "";
	for(var i=0; i<termArr.length-1; i++){
		processed += termArr[i] + "+";
	}
	processed += termArr[termArr.length-1];
	return processed;
}


// Returns an array of current nearby locations with updated times
var closeCurrent = function(allCurrent, pastLocs){
	current = [];
	console.log("New locations:");
	for (business of allCurrent){
		if(business.distance <= 1000){
			var time = 0;
			// console.log(business.name);
			for(pastBusiness of pastLocs){
				// console.log(pastBusiness);
				if(pastBusiness.name === business.name){
					// console.log("match");
					time = pastBusiness.time + 5;
				}
			}
			
			current.push({name: business.name, time: time});
			console.log("Name: " + business.name + "   " + "Time Spent: " + time);
		}
	}

	return current;
}

// Makes an alert if necessary
var makeAlert = function(current, id, name, vice){
	var max = 0;
	console.log(Contacts.findOne({owner: id}).contactNumber);
	console.log(Contacts.findOne({owner: id}).contactName);
	for (business of current){
		if(business.time > max){
			max = business.time;
		}
	}
	if(max === 30){
		// Send SMS to friend
		contactNumber = Contacts.findOne({owner: id}).contactNumber;
		if(typeof(contactNumber) !== 'undefined'){
			Meteor.call("sendWarningMessage", name, contactNumber, vice)
		}
	}
	else if (max === 20){
		// Links to support resources
	}
	else if (max === 10){
		// Push notifications
		serverMessages.notify('serverMessage:error', 'Test title', 'Test message');
	}
}