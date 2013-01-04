var logger = require('winston');

exports.list = function(req, res){
	logger.info('view: /resorts/');
	res.render('resorts', { title: 'Resorts' });
};