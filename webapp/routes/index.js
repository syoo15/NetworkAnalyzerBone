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
  console.log(i2cbase.deviceAddress);
  res.send("Device address: " + i2cbase.deviceAddress);
  };
  

/* 
 * POST request for running a sweep
 */

exports.sweep = function(req, res) {
  console.log(JSON.stringify(req.body));
  res.send("swept" + req.body.start + req.body.steps);
  };
  
