var mongoose = require('mongoose'),
    TrackModel = require('../models/track'),
    Track = mongoose.model('Track'),
    logger = require('winston'),
    _ = require('underscore');

exports.new = function(req, res){
  logger.info('tracks.new');
  var track = new Track(req.body);

  track.save(function(error){
    if(error){
      logger.error(error);
      res.send(500, { error: error});
    }
    res.send(track);
  });
};

exports.list = function(req, res){
  logger.info('tracks.new');
  // list is going to list tracks for a given resort - :resortId
  var resort = req.params.resortId;

  Track.find({'resort._id': resort })
       .exec(function(error, tracks){
          if(error){
            logger.error(error);
            res.send(500, {error: error});
          }

          res.format({
            html: function(){res.render('/tracks', {tracks: tracks});},
            json: function(){res.send(tracks);}
          });
       });
};

exports.show = function(req, res){
  logger.info('tracks.show');
  var trackId = req.params.id;
  if(!trackId){
    res.send(400, {error: 'no track exists'});
  }

  Track.findById(trackId, function(error, track){
    if(error){
      logger.error(error);
      res.send(500, {error: error});
    }
    res.send(track);
  });
};

exports.update = function(req, res){
  logger.info('tracks.update');
  var track = req.track;
  track = _.extend(track, req.body);

  track.save(function(error){
    if(error){
      logger.error(error);
      res.send(500, {error: error});
    }
    res.send(track);
  });
};