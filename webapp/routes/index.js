/* 
 * Functions serving http requests
 */
 
var i2cbase = require('../controller/i2cbase');
var fs = require('fs');
var datapath = '/home/debian/ImpedanceData/';
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
  //console.log(JSON.stringify(req.body));
  var sweepStats = i2cbase.runSweep(req.body, false);
  //console.log(sweepStats);
  res.json(sweepStats);
  };

/* 
 * POST request for saving a file
 */
 
exports.save = function(req, res) {
	//console.log(JSON.stringify(req.body));
	var filename = datapath + req.body.Name.toString() + '.json';
	//console.log(filename);
	var resp = {"save" : false};
	fs.exists(filename, function(exists) {
		if(exists) {
			resp["error"] = "file exists.. choose another filename";
		}
		else {
			fs.writeFile(filename, 
				JSON.stringify(req.body), "utf8", 
				function() {
					resp["save"] = true;
				});
		}	
	res.json(resp);
	});
}
