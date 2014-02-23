var i2c = require('./i2cbase');

var fs = require('fs');

var startf = 10100; 
var incr = 10; 
var zcal = 10000;

var file = fs.createWriteStream('./calibrate10k10Hz.txt');

for(var i=0; i<89; i++) {
	// sweep out 100 steps in each case 
	
	var mystart = startf + i*100;
	var myincr = incr;
	var mysteps = 100;
	
	var myparams = {start:mystart, increment:myincr, steps:mysteps}
	//console.log(myparams);
	var result = i2c.getGainFactor(myparams);
	
	for(var j=0; j<100; j++) {
		
		file.write(result.Frequency[j] + "," + 1/(zcal*result.ImpedanceMod[j]) +","+ result.ImpedanceArg[j] + "\n");
	}
}

file.end();

