var db = require('mongoose');

var updateSchema = db.Schema({
	update: String,
	date: {type: Date, default: Date.now}
});

var Update = db.model('Update', updateSchema);