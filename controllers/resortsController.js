var logger = require('winston');

/**
 * GET /resorts/list
 * Gets the list of resorts available
 * @param  {[type]} req : http request
 * @param  {[type]} res : http response
 */
exports.list = function(req, res){
	logger.info('view: /resorts/');
	res.render('resorts', { title: 'Resorts' });
};