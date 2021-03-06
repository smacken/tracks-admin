var express = require('express');
var app = express();

/**
 * GET home page
 * The index root route
 * Renders the index page
 * @param  {[type]} req : request
 * @param  {[type]} res : response
 */
exports.index = function(req, res){
  var env = app.get('env');

  var indexViewModel = { 
    title: 'Tracks', 
    env: env };
    
    res.render('index', indexViewModel);
};

exports.trailMap = function(req, res){
  var trailMapViewModel = {
    title: 'Trail Map',
    env: app.get('env')
  };

  res.render('trail-map', trailMapViewModel);
};