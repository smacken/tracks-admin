var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var ResortMapSchema = new Schema({
  name: {type : String, default : '', trim : true},
  mapUrl: {type : String, default : '', trim : true}
});

var ResortSchema = new Schema({
	name: { type : String, default : '', trim : true },
	region: { type : String, default : '', trim : true }, 
	country: { type : String, default : '', trim : true },
	siteUrl: { type : String, default : '', trim : true },
	createdAt : { type : Date, default : Date.now},
  maps: [ResortMapSchema]
});

mongoose.model('Resort', ResortSchema);