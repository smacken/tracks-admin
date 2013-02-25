
var mongoose = require('mongoose'),
    R = require('../models/resort'),
    Resort = mongoose.model('Resort'),
    logger = require('winston'),
    app = require('express')(),
    _ = require('underscore');

/**
 * GET /resorts/list
 * Gets the list of resorts available
 * @param  {[type]} req : http request
 * @param  {[type]} res : http response
 */
exports.list = function(req, res){
	logger.info('view: /resorts/');
	res.render('resorts', { title: 'Resorts', env: app.get('env') });
};

/**
 * Finds all the resorts
 * @param  {[type]} req : request
 * @param  {[type]} res : response
 * @return {[resorts]} list of all resorts
 */
exports.find = function(req, res){
  return Resort.find(function(error, resorts){
    if(error) { return console.log(error); }

    console.log('resorts found: ' + resorts.length);
    return res.send(resorts);
  });
};

/**
 * Add a new resort
 * @param {[Resort]} resort: the resort being added
 */
exports.add = function(req, res){
  var resort = new Resort(req.body);

  resort.save(function(error){
    if(error){ 
      res.send(500, {error: error});
    }
    res.send(resort);
  });
};