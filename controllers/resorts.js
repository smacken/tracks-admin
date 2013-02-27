
var mongoose = require('mongoose'),
    Resorts = require('../models/resort'),
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

exports.detail = function(req, res){
  logger.info('view: /resort-detail');
  res.render('resort-detail', { 
    title: 'Resort Detail', 
    env: app.get('env'), 
    resortId: req.params.id 
  });
};

exports.map = function(req, res){
  logger.info('view: /resort-map');
  res.render('resort-map', { 
    title: 'Resort Maps', 
    env: app.get('env'), 
    resortId: req.params.id
  });
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

exports.get = function(req, res){
  Resort.findById(req.query.id, function(error, resort){
    if(error){
      res.send(500, { error: error });
    }
    if(!resort){
      res.send(500, { error: 'No resort exists.'});
    }

    res.send(resort);
  });
};

/**
 * Add a new resort
 * @param {[Resort]} resort: the resort being added
 */
exports.add = function(req, res){
  var resort = new Resort(req.body);
  console.log(resort);

  resort.save(function(error){
    if(error){ 
      res.send(500, {error: error});
    }
    res.send(resort);
  });
};

exports.update = function(req, res){
  Resort.findByIdAndUpdate(req.id, req.body, {},  function(error, resort){
    if(error){
      res.send(500, {error: error});
    }
    if(!resort){
      res.send(404, 'The resort does not exist.');
    }

    res.send(resort);
  });
};

exports.delete = function(req, res){
  Resort.findByIdAndRemove(req.id, function(error){
    if(error){
      res.send(500, { error: error});
    }
    res.send(200);
  });
};