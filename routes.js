var user = require('./controllers/user');
var index = require('./controllers/index');
var resortsController = require('./controllers/resorts');
var tracksController = require('./controllers/tracks');

var resorts = require('./models/resort');

exports.setRoutes = function(app){

	app.get('/', index.index);
  app.get('/trail-map', index.trailMap);
	
	app.get('/users', user.list);
	app.get('/users/:id', user.getbyid);

  app.get('/resorts', resortsController.list);
	app.get('/api/resorts/', resortsController.find);
	app.get('/api/resort/:id', resortsController.get);
  app.post('/api/resort', resortsController.add);

  app.get('/resort-map/:id', resortsController.map);
  app.get('/resort-detail/:id', resortsController.detail);

  app.get('/api/tracks/:resortId', tracksController.list);
  app.post('/api/track', tracksController.new);
  app.put('/api/track', tracksController.update);
  app.delete('/api/track/:trackd', tracksController.delete);

};