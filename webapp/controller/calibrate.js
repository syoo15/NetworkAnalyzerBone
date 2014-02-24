var i2c = require('./i2cbase');

var fs = require('fs');

var startf = 100; 
var incr = 10; 
var zcal = 100000;
var steps = 510;

var file = fs.createWriteStream('./cal100_10_1k_2k.txt');

var myparams = {start:startf, increment:incr, steps:steps}

result = i2c.getGainFactor(myparams, true);

for(var j=0; j<steps; j++) {
	file.write(result.Frequency[j] + "," + 
			1/(zcal*result.ImpedanceMod[j]) +","+ 
			result.ImpedanceArg[j] + "\n");
	}

file.end();

