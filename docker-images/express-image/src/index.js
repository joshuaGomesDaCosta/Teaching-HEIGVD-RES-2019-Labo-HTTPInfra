var Chance = require('chance');
var chance = new Chance();

var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.send( generateZoo());
});

app.listen(3000, function() {
	console.log('listen HTTP request to port 3000');
});

function generateZoo() {
	var animals = [];
	var nbAnimals = chance.integer({
		min: 1,
		max: 10
	});

	console.log("il y a " + nbAnimals + " animaux a voir");

	for( var i = 0; i < nbAnimals; i++){
		var gender = chance.gender();
		animals.push({
			name: chance.first({ gender : gender}),
			gender: gender,
			specie: chance.animal({ type: 'zoo'})
		});
	};
	
	console.log(animals);
	return animals;
}

