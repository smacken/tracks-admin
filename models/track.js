var db = require('mongoose');
var Schema = db.Schema;
var TrackSchema = new Schema({
	resort: {type : Schema.ObjectId, ref : 'Resort'},
	name: {type : String, default : '', trim : true},
  order: {type: Number, default: 1},
	videoUrl: {type : String, default : '', trim : true}
});

db.model('Track', TrackSchema);
