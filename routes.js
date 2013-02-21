var user = require('./controllers/user');
var index = require('./controllers/index');
var resortsController = require('./controllers/resorts');
var tracksController = require('./controllers/tracks');

var resorts = require('./models/resort');

exports.setRoutes = function(app){

	app.get('/', index.index);
	
	app.get('/users', user.list);
	app.get('/users/:id', user.getbyid);

  app.get('/resorts', resortsController.list);
	app.get('/api/resorts/', resortsController.find);
	app.post('/api/resort/', resortsController.add);

  app.get('/api/tracks/:resortId', tracksController.list);
  app.post('/api/track', tracksController.new);
  app.put('/api/track', tracksController.update);

};