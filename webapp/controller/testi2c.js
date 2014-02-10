/* 
 * program to test the i2c bus on the BB
 */

var i2c = require('i2c');
var address = 0x0D;

var wire = new i2c(address, {device:'/dev/i2c-1', debug:false});

wire.scan(function(err, data) {console.log(data);});
