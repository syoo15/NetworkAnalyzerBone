var i2c = require('./i2cbase');

var fs = require('fs');

var zcal = 503.4; 

var file = fs.createWriteStream('./cal_100_503_low.txt');

var myparams = {start:50, increment:10, steps:295, range:"L"};

var result = i2c.getGainFactor(myparams, true);

for(var j=0; j<myparams.steps; j++) {
	file.write(result.Frequency[j] + "," + 
			1/(zcal*result.ImpedanceMod[j]) +","+ 
			result.ImpedanceArg[j] + "\n");
	}

file.end();

var file = fs.createWriteStream('./cal_100_503_high.txt');

var myparams = {start:1000, increment:100, steps:295, range:"H"};

var result = i2c.getGainFactor(myparams, true);

for(var j=0; j<myparams.steps; j++) {
	file.write(result.Frequency[j] + "," + 
			1/(zcal*result.ImpedanceMod[j]) +","+ 
			result.ImpedanceArg[j] + "\n");
	}

file.end();