var db = require('mongoose');

var TrackSchema = db.Schema({
	id: String,
	resortId: String,
	name: String,
	videoUrl: String
});

var Track = db.model('Track', TrackSchema);

var trackSchema = {};

var Track = db.model('Track', db.Schema(trackSchema));