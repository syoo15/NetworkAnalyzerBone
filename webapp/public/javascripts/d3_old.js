// D3 chart Generation
	
	//Set the dimensions of the canvas & graph
	var margin = {top:30, right:20, bottom:30, left:50};
	var width = 400 - margin.left -margin.right;
	var height = 350 - margin.top - margin.bottom;
	
	/* Old code 
	//var offsetX = 30;
	//var offsetY = 20;
	//var scale = 3.0;
	//var margin = svgwidth/(chartdata.length - 1);  // Space between each data point
		
	//var x_max = d3.max(chartdata.f);
	//var x_min = d3.min(f);
	//var y_max = d3.max(chartdata.z);
	*/
	
	// Set the ranges 
	var x = d3.scale.linear()
		.range([0, width]);
	var y = d3.scale.linear()
		.range([height, 0]);
		
	// Define the axis 
	var x_axis = d3.svg.axis()
		.scale(x)
		.orient("bottom")
		.ticks(5);
		
	var y_axis = d3.svg.axis()
		.scale(y)
		.orient("left")
		.ticks(5);
	
	// Define the line
	var line_imp = d3.svg.line() 
		.x(function(d) {
			return x(d.f);
		})
		.y(function(d) {
			return y(d.z);
		});
		
	var line_phase = d3.svg.line()
		.x(function(d) {
			return x(d.f);
		})
		.y(function(d) {
			return y(d.phi);
		});
		
	// Adds svg canvas 
	var svg = d3.select("#gaindiv")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + ", " + margin.top +")");
		
	var linesvg = svg.append("g");
	
	var focus = svg.append("g")
		.style("display", "none");
		
	// Scale the range of the data
	
	x.domain(d3.extent(chartData, function(d) {
		return d.f;
	}));
	y.domain([0, d3.max(chartData, function(d) {
		return d.z;
	})]);
	
	// Add line_graph path (impedance)
	linesvg.append("path")
		.attr("class", "line")
		.attr("d", line_imp(chartData));
	
	// Add second line (phase)
	linesvg.append("path")
		.attr("class", "line")
		.attr("stroke", #69A55C)
		.attr("d", line_phase(chartData));
	
	// Add x-axis 
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0, "+ height+ ")")
		.call(x_axis);
		
	
	/* drawZ(chartdata.z, "z");
	drawPhi(chartdata.phi, "phi");
	drawScale();
	//drawScale2();
	
	function drawZ (dataset, ccsClass) {
			var line = d3.svg.line()
				.x(function(d,i) {
					return offsetX + i* margin +10;
				})
				.y(function(d,i) {
					return svgheight - (d * scale) - offsetY;
				})
				
			var lineElements = d3.select("#gaindiv")
				.append("path")
				.attr("class", "line "+ccsClass)
				.attr("d", line(dataset))
	};
	
	function drawScale() {
		var yscale = d3.scale.linear()
			.domain([0, 100])
			.range([scale*100,0])
			
		d3.select("#gaindiv")
			.append("g")
			.attr("class", "axis")
			.attr("transform", "translate("+offsetX+", "+offsetY+")")
			.call(
				d3.svg.axis()
					.scale(yscale)
					.orient("left")
				)
				
		var xscale = d3.scale.linear()
			.domain([0, x_max])
			.range([0, svgwidth])
			
		d3.select("#gaindiv")
			.append("g")
			.attr("class", "axis")
			.attr("transform", "translate("+offsetX+", "+(svgheight - offsetY)+")")
			.call(
				d3.svg.axis()
					.scale(xscale)
					.orient("bottom")
					.ticks(5)
				)
	};
	
	function drawPhi (dataset, ccsClass) {
			var line = d3.svg.line()
				.x(function(d,i) {
					return offsetX + i* margin +10;
				})
				.y(function(d,i) {
					return svgheight - (d * 50) - 300;
				})
				
			var lineElements = d3.select("#gaindiv")
				.append("path")
				.attr("class", "line "+ccsClass)
				.attr("d", line(dataset))
	}; */
	
	/* function drawScale2() {
		var yscale = d3.scale.linear()
			.domain([0, 100])
			.range([scale*100,0])
			
		d3.select("#graph")
			.append("g")
			.attr("class", "axis")
			.attr("transform", "translate("+offsetX+", "+offsetY+")")
			.call(
				d3.svg.axis()
					.scale(yscale)
					.orient("right")
				)
	}
 */
	