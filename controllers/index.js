/**
 * GET home page
 * The index root route
 * Renders the index page
 * @param  {[type]} req : request
 * @param  {[type]} res : response
 */
exports.index = function(req, res){
  res.render('index', { title: 'Tracks' });
};