var i2c = require('./i2cbase');

var fs = require('fs');

var startf = 100; 
var incr = 5; 
var zcal = 100000;
var steps = 511;

var file = fs.createWriteStream('./calibrate3k5Hz.txt');

var myparams = {start:startf, increment:incr, steps:steps}

result = i2c.getGainFactor(myparams, true);

for(var j=0; j<steps; j++) {
	file.write(result.Frequency[j] + "," + 
			1/(zcal*result.ImpedanceMod[j]) +","+ 
			result.ImpedanceArg[j] + "\n");
	}

file.end();

