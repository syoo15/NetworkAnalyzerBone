/*
 * I2C library for the AD5933 Impedance Analyzer Board. 
 * Author: Kaustubh D. Bhalerao (bhalerao@illinois.edu)
 * License: MIT - Open Source
 * Version: 0.0.1 - pre release
 * Part of the OpenBioinstrumentation project. 
 *
 * Dependency: i2c module - specified in the node app package.json
 * Try reinstalling the node-i2c module if it doesn't work for the first time. 
 *
 * Changelog: 
 *	Feb 9 2014 - Initial definitions. 
 * 
 */

/* 
 * Constants for the AD 5933
 */

// Device address
var DEVICE_ADDRESS = 0x0D; // default address of the AD5933

// Register map
var R_CONTROL0 =        0x80;
var R_CONTROL1 =        0x81;
var R_STARTF0 =         0x82;
var R_STARTF1 =         0x83;
var R_STARTF2 =         0x84;
var R_INCF0 =           0x85;
var R_INCF1 =           0x86;
var R_INCF2 =           0x87;
var R_NUMINC0 =         0x88;
var R_NUMINC1 =         0x89;
var R_SETTLE0 =         0x8A;
var R_SETTLE1 =         0x8B;
var R_STATUS =          0x8F;
var R_TEMP0 =           0x92;
var R_TEMP1 =           0x93;
var R_REAL0 =           0x94;
var R_REAL1 =           0x95;
var R_IMAG0 =           0x96;
var R_IMAG1 =           0x97;

// Control Register 
// See Table 9
var INIT_WITH_START_FREQ =  0x1000; 
var START_FREQ_SWEEP =      0x2000;
var INCREMENT_FREQ =        0x3000;
var REPEAT_FREQ =           0x4000;
var MEASURE_TEMP =          0x9000;
var POWER_DOWN_MODE =       0xA000; //default upon powerup
var STANDBY_MODE =          0xB000;

var OUTPUT_2VPP =           0x0; // default
var OUTPUT_200MVPP =        0x2;
var OUTPUT_400MVPP =        0x4;
var OUTPUT_1VPP =           0x6; 

var PGA_GAIN1X =            0x1;
var PGA_GAIN5X =            0x0; // default
var INTERNAL_CLK =          0x0; // default
var EXTERNAL_CLK =          0x8;

var RESET =                 0x10;

// Status register values
var VALID_TEMP =            0x1;
var VALID_DFT_DATA =        0x2;
var SWEEP_COMPLETE =        0x4;

// Global variables
var output_range = OUTPUT_2VPP;
var pga_gain = PGA_GAIN5X;
var clock_source = INTERNAL_CLK;
var sweep_setup = false;

var i2c = require('i2c');

var wire = new i2c(DEVICE_ADDRESS); 
// associates with first i2c bus by default
// 
// Scan the I2C bus and make check if anything is showing. 

wire.scan(function (err, data) {
    console.log(data);
    if(data.indexOf('0x0D') != -1) {
        DEVICE_ADDRESS = 0x0D;
    }
    else {
        DEVICE_ADDRESS = 0x0;
    }
});
// Helper functions

var upper_byte = function(integer) {
	return ((integer >> 8) & 0xFF);
}

var lower_byte = function(integer) {
	return (integer & 0xFF);
}

var error_msg = function(err) {
	console.log("Error:: " + String(err));
}

var point_to_address = function(address) {
	// pointer command = 0xB0 
	// point to address
	wire.writeBytes(0xB0, [address], 
		error_msg(err));
}

var set_device_standby = function() {
	// Only R_CONTROL0 will be overwritten. 
	var control_byte = 0xB0 | output_range | pga_gain;
	wire.writeBytes(R_CONTROL0, [control_byte],
		error_msg(err));
}

var reset_device = function() {
	var control_byte = lower_byte(RESET | clock_source);
	wire.writeBytes(R_CONTROL1, [control_byte], 
		error_msg(err));
}

var program_init = function() {
	var control_byte = upper_byte(INIT_WITH_START_FREQ | output_range | pga_gain);
	wire.writeBytes(R_CONTROL0, [control_byte], 
		error_msg(err));
}

var start_sweep = function() {
	var control_byte = upper_byte(START_FREQ_SWEEP | output_range | pga_gain);
	wire.writeBytes(R_CONTROL0, [control_byte], 
		error_msg(err));
}

var increment_frequency_step = function() {
	var control_byte = upper_byte(INCREMENT_FREQ | output_range | pga_gain);
	wire.writeBytes(R_CONTROL0, [control_byte], 
		error_msg(err));
}

var repeat_frequency = function() {
	var control_byte = upper_byte(REPEAT_FREQ | output_range | pga_gain);
	wire.writeBytes(R_CONTROL0, [control_byte], 
		error_msg(err));
}

var power_down_device = function() {
	var control_byte = upper_byte(POWER_DOWN_MODE);
	wire.writeBytes(R_CONTROL0, [control_byte], 
		error_msg(err));
}

var read_status = function() {
    // obtains status register value
	point_to_address(R_STATUS);
	wire.readByte(function(err, res) {
		if(err = undefined) { 
			return(res);
		}
		else {
			error_msg(err);
		}
	});
}

var get_status = function() {
    // Parses the status register and returns a dictionary
    status = {};
    res = read_status();
    
    if(res & 1) {
        status["Valid_Temp"] = true;
    }
    if((res>>1) & 1) {
        status["Valid_Data"] = true; 
    }
    if((res>>2) & 1) {
        status["Sweep_Complete"] = true;
    }
    
    return(status);
}


        
    


var measure_temperature = function() {
	var control_byte = upper_byte(MEASURE_TEMP | output_range | pga_gain);
	wire.writeBytes(R_CONTROL0, [control_byte], error_msg(err));
}






/* 
 * Test function to show that exporting works
 * Will be removed in a future version
 */
 
exports.deviceAddress = DEVICE_ADDRESS;

/* 
 * Function to extract all information from the device and return it as
 * a JSON object
 */

exports.deviceParameters = function() {
	
}




 
