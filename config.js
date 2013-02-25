var path = require('path');

exports.configureExpress = function(app, express){

    app.configure(function(){

      app.use(function (req, res, next) {
        res.removeHeader("X-Powered-By");
        next();
      });

      app.set('port', process.env.PORT || 3000);
      app.set('views', __dirname + '/views');
      app.set('view engine', 'jade');
      app.use(express.favicon());
      app.use(express.logger('dev'));
      app.use(express.bodyParser());
      app.use(express.methodOverride());
      app.use(express.compress());
      app.use(express.staticCache());
      app.use(app.router);

      var oneYear = 31557600000;
      app.use(express.static(path.join(__dirname, 'public', { maxAge: oneYear})));
    });

    app.configure('development', function(){
      app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    });

    app.configure('production', function(){
      app.use(express.errorHandler());
    });
};