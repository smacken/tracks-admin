var user = require('./controllers/user');
var index = require('./controllers/index');
var resortController = require('./controllers/resortsController');

var resorts = require('./models/resort');

exports.setRoutes = function(app){

	app.get('/', index.index);
	app.get('/resorts/', resortController.list);


	app.get('/users', user.list);
	app.get('/users/:id', user.getbyid);

	app.get('/api/resorts/', resorts.find);

};