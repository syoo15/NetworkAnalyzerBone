var i2c = require('./i2cbase');

var fs = require('fs');

//var zcal = 264.5;
var zcal = 100.2; 

var file = fs.createWriteStream('./SmoothCal2.txt');

/*
var myparams = {range:"L",start:"20",increment:"30",steps:"19"};

var result = i2c.getGainFactor(myparams, true);

for(var j=0; j<myparams.steps; j++) {
	file.write(result.Frequency[j] + "," + 
			1/(zcal*result.ImpedanceMod[j]) +","+ 
			result.ImpedanceArg[j] + "\n");
	}
*/
myparams = { range: 'M', start: '1000', increment: '1000', steps: '4' };

result = i2c.getGainFactor(myparams, true);

for(var j=0; j<myparams.steps; j++) {
	file.write(result.Frequency[j] + "," + 
			1/(zcal*result.ImpedanceMod[j]) +","+ 
			result.ImpedanceArg[j] + "\n");
	}

myparams = {range:"H",start:"6000",increment:"1000",steps:"23"}

result = i2c.getGainFactor(myparams, true);

for(var j=0; j<myparams.steps; j++) {
	file.write(result.Frequency[j] + "," + 
			1/(zcal*result.ImpedanceMod[j]) +","+ 
			result.ImpedanceArg[j] + "\n");
	}


file.end();
