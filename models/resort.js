var mongoose = require('mongoose');

var ResortSchema = mongoose.Schema({
	id: String,
	name: String,
	region: String, 
	country: String,
	siteUrl: String		
});

var Resort = mongoose.model('Resort', ResortSchema);

Resort.find().exec(function(error, resorts){
	
	if(error) { console.error('no resorts'); }

	console.log(resorts);
});

exports.find = function(req, res){
	return Resort.find(function(error, resorts){
		if(error) { return console.log(error); }

		console.log('resorts found: ' + resorts.length);
		return res.send(resorts);
	});
};