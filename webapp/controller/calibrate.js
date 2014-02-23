var i2c = require('./i2cbase');

var fs = require('fs');

var startf = 100; 
var incr = 195; 
var zcal = 100000;
var steps = 510;

var file = fs.createWriteStream('./calibrate100_195.txt');

var myparams = {start:startf, increment:incr, steps:steps}

result = i2c.getGainFactor(myparams, true);

for(var j=0; j<steps; j++) {
	file.write(result.Frequency[j] + "," + 
			1/(zcal*result.ImpedanceMod[j]) +","+ 
			result.ImpedanceArg[j] + "\n");
	}

file.end();

