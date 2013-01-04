
var express = require('express')
  , http = require('http')
  , logger = require('winston')
  , errors = require('./errors')
  , routes = require('./routes')
  , config = require('./config');

var app = express();

logger.add(logger.transports.File, {filename: 'admin.log', handleExceptions: true});
//logger.add(logger.transports.Console, {colorize: true});
 
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tracks');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

config.configureExpress(app, express);
 
routes.setRoutes(app);

http.createServer(app)
    .listen(app.get('port'), function(){
      console.log("Express server listening on port " + app.get('port'));
      logger.info('starting server');
    });
