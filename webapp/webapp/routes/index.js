/* 
 * Functions serving http requests
 */
 
var i2cbase = require('../controller/i2cbase');
/*
 * GET home page.
 */

exports.index = function(req, res) {
	res.render('index', {});
};


/* 
 * GET for refresh. Uses an AJAX call.
 */

exports.refresh = function(req, res) {
	var params = i2cbase.deviceParameters()
  console.log(params);
  res.send(params);
  };
  

/* 
 * POST request for running a sweep
 */

exports.sweep = function(req, res) {
  console.log(JSON.stringify(req.body));
  var sweepStats = i2cbase.runSweep(req.body, false);
  //console.log(sweepStats);
  res.json(sweepStats);
  };
  
