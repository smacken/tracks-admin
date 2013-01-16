
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.getbyid = function(req, res){
	console.log(req.params.id);
	res.send(req.params.id);
};