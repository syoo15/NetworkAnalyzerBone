var i2c = require('./i2cbase');

var fs = require('fs');

var zcal = 264.5; 

var file = fs.createWriteStream('./cal_100_264_low.txt');

var myparams = {start:50, increment:50, steps:39, range:"L"};

var result = i2c.getGainFactor(myparams, true);

for(var j=0; j<myparams.steps; j++) {
	file.write(result.Frequency[j] + "," + 
			1/(zcal*result.ImpedanceMod[j]) +","+ 
			result.ImpedanceArg[j] + "\n");
	}

file.end();

var file = fs.createWriteStream('./cal_1k_264_high.txt');

var myparams = {start:2000, increment:100, steps:480, range:"H"};

var result = i2c.getGainFactor(myparams, true);

for(var j=0; j<myparams.steps; j++) {
	file.write(result.Frequency[j] + "," + 
			1/(zcal*result.ImpedanceMod[j]) +","+ 
			result.ImpedanceArg[j] + "\n");
	}

file.end();
