$(document).ready(function() {
	var refreshDate = function() {
		var date = new Date();
    	var field = document.getElementById("date");
    	field.innerHTML = date.toString();
    	};

    refreshDate();
    var chart;
    var chartData = [
		{
			"f": 50,
			"z": 10000,
			"zmean": 5000,
			"phi": 4,
			"phimean": 2,
		},
		{
			"f": 10000,
			"z": 90000,
			"zmean": 40000,
			"phi":-4,
			"phimean":-2,
		},
		{
			"f": 20000,
			"z": 110,
			"zmean":200,
			"phi":0,
			"phimean":-1,
		}
	];


/*

	AmCharts.ready(function () {
        //console.log("Executing amcharts");
        // XY CHART
        chart = new AmCharts.AmXYChart();
        chart.pathToImages = "http://www.amcharts.com/lib/3/images/";
        chart.dataProvider = chartData;
        chart.startDuration = 1;

        // AXES
        // Frequency
        var fAxis = new AmCharts.ValueAxis();
        fAxis.title = "Frequency (Hz)";
        fAxis.position = "bottom";
        fAxis.dashLength = 1;
        fAxis.axisAlpha = 0;
        fAxis.autoGridCount = true;
        fAxis.logarithmic = true;
        chart.addValueAxis(fAxis);

        // Impedance
        var zAxis = new AmCharts.ValueAxis();
        zAxis.position = "left";
        zAxis.title = "|Impedance| (ohm)";
        zAxis.dashLength = 1;
        zAxis.titleColor = "#FF6600";
        zAxis.axisAlpha = 0;
        zAxis.autoGridCount = true;
        zAxis.logarithmic = true;
        chart.addValueAxis(zAxis);

        // Phase
        var pAxis = new AmCharts.ValueAxis();
        pAxis.position = "right";
        pAxis.title = "Phase (rad)";
        pAxis.dashLength = 1;
        pAxis.axisAlpha = 0;
        pAxis.titleColor = "#69A55C";
        pAxis.autoGridCount = true;
        //yAxis.logarithmic = true;
        chart.addValueAxis(pAxis);

        // GRAPHS
        // triangles up
        var graph1 = new AmCharts.AmGraph();
        graph1.yAxis = zAxis;
        graph1.lineColor = "#FF6600";
        graph1.balloonText = "f:[[x]] Z:[[y]]";
        graph1.xField = "f";
        graph1.yField = "z";
        graph1.lineAlpha = 0.7;
        graph1.lineThickness = 2;
        graph1.bullet = "round";
        graph1.bulletSize = 4
        chart.addGraph(graph1);

        var graph11 = new AmCharts.AmGraph();
        graph11.yAxis = zAxis;
        graph11.lineColor = "#FF6600";
        //graph11.balloonText = "f:[[x]] Z:[[y]]";
        graph11.xField = "f";
        graph11.yField = "zmean";
        graph11.lineAlpha = 0.3;
        graph11.lineThickness = 1;
        graph11.bullet = "none";
        //graph11.bulletSize = 3
        chart.addGraph(graph11);

        var graph2 = new AmCharts.AmGraph();
        graph2.yAxis = pAxis;
        graph2.lineColor = "#69A55C";
        graph2.balloonText = "f:[[x]] Phi:[[y]]";
        graph2.xField = "f";
        graph2.yField = "phi";
        graph2.lineAlpha = 0.7;
        graph2.lineThickness = 2;
        graph2.bullet = "none";
        chart.addGraph(graph2);

        var graph21 = new AmCharts.AmGraph();
        graph21.yAxis = pAxis;
        graph21.lineColor = "#69A55C";
        //graph21.balloonText = "f:[[x]] Phi:[[y]]";
        graph21.xField = "f";
        graph21.yField = "phimean";
        graph21.lineAlpha = 0.3;
        graph21.lineThickness = 1;
        graph21.bullet = "none";
        chart.addGraph(graph21);


        // CURSOR
        var chartCursor = new AmCharts.ChartCursor();
        chart.addChartCursor(chartCursor);

        // SCROLLBAR

        //var chartScrollbar = new AmCharts.ChartScrollbar();
        //chart.addChartScrollbar(chartScrollbar);

        // WRITE
        chart.write("gaindiv");
	});

*/

    // Rendering sample graph for the first time
    var line = prettyline()
                .render();
    
    function prettyline() {
   // Default settings for reuse
   var $el = d3.select("#gaindiv")
   var color = "darkcyan";
   var color2 = "lightsalmon";
   var margin = {top:75, right:75, bottom:75, left:75};
   var width = 800 - margin.left - margin.right;
   var height = 600 - margin.top - margin.bottom;
   var svg, y, xAxis, yAxis, impedance, phase;
   var navWidth = width;
   var navHeight = 100 -margin.top - margin.bottom;

   var seokchan = {};
   var svg;

  //console.log(chartData);
  //console.log(chartData.length);

  // Method for render/refresh graph
  seokchan.render = function(){
    // First time Rendering
    if(!svg){

      // Scaling x range
      var x = d3.scale.log()
      .domain([[0, d3.max(chartData, function(d) {
      return d.f;
      })]])
        .range([0, width]).nice();

      // Scaling y range
      var y = d3.scale.linear()
            .domain([d3.min(chartData, function(d){
          return d.z;
        }), d3.max(chartData, function(d) {
            return d.z;
            })])
            .range([height, 0]);        // y range as a log (If needed)

      var y2 = d3.scale.linear()
                        .domain([d3.min(chartData, function(d) {
                        return d.phi;}), d3.max(chartData, function(d) {
                        return d.phi;
                        })])
                        .range([height, 0]);

      
       // Define the axis
      function x_axis() {
           return d3.svg.axis()
                        .scale(x)
                        .orient("bottom")
                    .ticks(5);
          }

      function y_axis() {
            return d3.svg.axis()
                       .scale(y)
                         .orient("left")
                           .tickFormat(function(d) {
                                  return y.tickFormat(5, d3.format(",d"))(d);
                            })
                         .ticks(10);
            }

      var y_axis2 = d3.svg.axis()
                            .scale(y2)
                            .orient("right")
                            .tickFormat(function(d) {
                                return y2.tickFormat(10, d3.format(",d"))(d);
                            });


      
       // Define the line (Impedance curve and Phase curve)
      var impedance = d3.svg.line()
                .x(function(d) {
                    return x(d.f);

                })
                .y(function(d) {
                    return y(d.z);
                })
              .interpolate("linear");

      var phase = d3.svg.line()
                .x(function(d) {
                    return x(d.f);
                })
                .y(function(d) {
                    return y2(d.phi);
                })
                .interpolate("linear");


      // Define svg canvas with margin setup
      svg = $el.append("svg:svg")
        .attr("viewBox", "0 0 800 600")
        .attr("preserveAspectRatio", "xMinYMin meet")
            .append("svg:g")
            .attr("transform", "translate(" + margin.left + ", " + margin.top +")");

      // Scale the range of the data (Impedance)
       x.domain(d3.extent(chartData, function(d) {
            return d.f;
        }));
       y.domain([0, d3.max(chartData, function(d) {
            return d.z;
        })]);

    
     //  Call X & Y Axes on the right location
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0, "+ height+ ")")
      .call(x_axis());

    svg.append("g")
            .attr("class", "y axis")
            .call(y_axis());

    svg.append("g")
            .attr("class", "y axis")
      .attr("transform", "translate(" + width + " ,0)")
            .call(y_axis2);

    
    // Grid line generation
    svg.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0, "+ height+ ")")
      .call(x_axis().tickSize(-height,0,0).tickFormat(""));

    svg.append("g")
        .attr("class", "grid")
        .call(y_axis().tickSize(-width,0,0).tickFormat(""));

    
     // Labeling axis title
     // text label for the x axis
     svg.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom - 12) + ")")
        .style("text-anchor", "middle")
        .text("Frequency (Hz)");

     // text label for the impedance y axis
     svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("dy", "1em")
                .attr("y", 0 - margin.left)
                .attr("x",0 - (height / 2))
                .style("text-anchor", "middle")
                .text("Impedance (ohms)");

    // text label for the phase y axis
     svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("dy", "1em")
                .attr("y", width + margin.left - 25)
                .attr("x",0 - (height / 2))
                .style("text-anchor", "middle")
                .text("Phase (rad)");

    
     //   Draw a path line graph on the svg canvas
  path =  svg.append("path")
       .attr("class", "line")
       .attr("stroke", color)
       .attr("d", impedance(chartData));

  path2 =  svg.append("path")
          .attr("class", "line")
          .attr("stroke", color2)
          .attr("opacity",0.6)
          .attr("d", phase(chartData));

  
   //  Line graph Transition
   var totalLength = path.node().getTotalLength();
   var totalLength2 = path2.node().getTotalLength();

          path
             .attr("stroke-dasharray", totalLength + " " + totalLength)
             .attr("stroke-dashoffset", totalLength)
             .transition()
             .duration(950)
             .ease("linear")
             .attr("stroke-dashoffset", 0);

          path2
            .attr("stroke-dasharray", totalLength2 + " " + totalLength2)
            .attr("stroke-dashoffset", totalLength2)
            .transition()
            .duration(950)
            .ease("linear")
            .attr("stroke-dashoffset", 0);


    
     //  Add points to line
     

    // Impedance line points + Tooltips
    var imp_line = svg.selectAll(".dot")
      .data(chartData)

      imp_line.enter()
      .append("circle")
      .attr("r",3.5)
      .attr("cx", function(d) { return x(d.f)})
      .attr("cy", function(d) { return y(d.z)})
      .attr("fill", "darkcyan")
      .on("mouseover", function(d){
    // Pretty points transition on mouse hover.
        d3.select(this)
        .transition()
        .duration(300)
        .attr("r", 5.0)
        .attr("fill","white")
        .attr("stroke", "darkcyan")
        .attr("stroke-width", 2);

        div.transition()
        .duration(100)
        .style("opacity", 0.9);
        div .html("Frequency:" + "&nbsp" + d.f.toLocaleString() +"&nbsp" + "Hz" +"</br>" + "Impedance:" +"&nbsp" + d.z.toLocaleString() + "&nbsp" + "Ohms")
        .style("left", (d3.event.pageX - 55) + "px")
        .style("top", (d3.event.pageY - 45) + "px");
      })
      .on("mouseout", function(d){
        // Pretty points transition on mouse out.
        d3.select(this)
          .transition()
          .duration(300)
          .attr("r", 3.5)
          .attr("fill", "darkcyan");

        div.transition()
        .duration(100)
        .style("opacity", 0);
      });

    // Phase line points with Tooltips
     var ph_line = svg.selectAll("dot2")
        .data(chartData)

        ph_line.enter()
        .append("circle")
        .attr("r",3.5)
        .attr("cx", function(d) { return x(d.f)})
        .attr("cy", function(d) { return y2(d.phi)})
        .attr("fill", "lightsalmon")
        .attr("opacity",0.6)
        .on("mouseover", function(d){
          d3.select(this)
          .transition()
          .duration(300)
          .attr("r", 5.0)
          .attr("fill","white")
          .attr("stroke", "lightsalmon")
          .attr("stroke-width", 2);

          div.transition()
          .duration(100)
          .style("opacity", 0.9);
          div.html("Frequency:" + "&nbsp" + d.f.toLocaleString() +"&nbsp" + "Hz" +"</br>" + "Phase:" +"&nbsp" + d.phi.toLocaleString() + "&nbsp" + "Rad")
          .style("left", (d3.event.pageX - 55) + "px")         // The mouse position relative to the left edge of the document.
          .style("top", (d3.event.pageY - 45) + "px");         // The mouse position relative to the top edge of the document.
        })
        .on("mouseout", function(d){
          d3.select(this)
            .transition()
            .duration(300)
            .attr("r", 3.5)
            .attr("fill", "lightsalmon");

          div.transition()
          .duration(100)
          .style("opcaity", 0);
        });

    
     // Adding Responsive Legends using d3.svg.legend library
     
         legendsName = ["Impedance","Phase"]
         legendColor = d3.scale.ordinal().domain(legendsName).range(["darkcyan","lightsalmon"]);

         verticalLegend = d3.svg.legend().labelFormat("none").cellPadding(5).orientation("vertical").units("Legends").cellWidth(25).cellHeight(18).inputScale(legendColor).cellStepping(10);

         d3.select("svg").append("g").attr("transform", "translate(685,35)").attr("class", "legend").call(verticalLegend);

    // Define 'div' for tooltips
         var div = d3.select("body")
            .append("div")  // declare the tooltip div
            .attr("class", "tooltip")              // apply the 'tooltip' class
            .style("opacity", 0);                  // set the opacity to nil


}
    // Else case for refreshing/updating chartdata and plot
    else{
      seokchan.data(chartData);

      // Re-Scale the range of the x & y (Impedance)
        x.domain(d3.extent(chartData, function(d) {
            return d.f;
        }));
        y.domain([0, d3.max(chartData, function(d) {
            return d.z;
        })]);

      // Refreshing x and y axis change with transition
      svg.select("g.y")
        .transition()
        .duration(1000)
        .call(yAxis);

      svg.select("g.x")
        .transition()
        .duration(1000)
        .call(xAxis);

      svg.selectAll("path.line")
         .transition()
         .duration(1000)
         .attr("d", impedance(chartData));
    }
    return seokchan;
  }

  
  // Getter and Setter Constructor Methods
  // Keep local variables not destroyed, and not open to public (default)
  // Closure is formed
  seokchan.data = function(value){
    if (!arguments.length) return data;
    data = value;
    return seokchan;
  };
  seokchan.$el = function(value){
    if (!arguments.length) return $el;
    $el = value;
    return seokchan;
  };
 seokchan.width = function(value){
    if (!arguments.length) return width;
    width = value;
    return seokchan;
  };

  seokchan.height = function(value){
    if (!arguments.length) return height;
    height = value;
    return seokchan;
  };

  seokchan.color = function(value){
    if (!arguments.length) return color;
    color = value;
    return seokchan;
  };
  seokchan.color2 = function(value){
    if (!arguments.length) return color2;
    color2 = value;
    return seokchan;
  }
  return seokchan;
};


  // Default parameters for sweep when refreshed

    var refresh = function() {
        $.get('/refresh', function(data, status) {
            if(data == undefined) {
                document.getElementById("statustext").innerHTML = "No device found";
            }
            else {
                $("#statustext").html("Device address: " +
                	data.DeviceAddress + " Temperature: " + data.Temperature + "&deg;C");
                $("#StartFreqL").val(20);
                $("#IncrFreqL").val(30);
                $("#NumStepsL").val(19);
                $("#StartFreqM").val(1000);            // 620, 100 50 = Default
                $("#IncrFreqM").val(1000);
                $("#NumStepsM").val(4);
                $("#StartFreqH").val(6000);           // 6000, 500, 187 = Default
                $("#IncrFreqH").val(1000);
                $("#NumStepsH").val(23);
            }
            refreshDate();
        });
    };

    refresh();

/*
    // Button for Calibration 
    $("#calibration").click(function(){
        var name = $("#Cal_Val").val();
      if (name == undefined | name == "") {
        alert("Please enter valid value of the calibration resistor");
      }
      else{
          var btn = $(this);
          btn.button('Running calibration');
          var i2c = require('./i2cbase');
          var fs = require('fs');
          var zcal = $("#Cal_Val").val();
          var file = fs.createWriteStream('./SmoothCal2.txt');
          console.log(zcal);
      $(".progress-bar").attr("style", "width: 20%;");
        var myparams = {range:"L",start:"20",increment:"30",steps:"19"};
        var result = i2c.getGainFactor(myparams, true);
        for(var j=0; j<myparams.steps; j++) {
            file.write(result.Frequency[j] + "," + 
            1/(zcal*result.ImpedanceMod[j]) +","+ 
            result.ImpedanceArg[j] + "\n");
            }
      $(".progress-bar").attr("style", "width: 55%;");
          myparams = { range: 'M', start: '620', increment: '100', steps: '50' };
          result = i2c.getGainFactor(myparams, true);

            for(var j=0; j<myparams.steps; j++) {
              file.write(result.Frequency[j] + "," + 
                  1/(zcal*result.ImpedanceMod[j]) +","+ 
                  result.ImpedanceArg[j] + "\n");
              }
      $(".progress-bar").attr("style", "width: 100%;");
         myparams = {range:"H",start:"6000",increment:"500",steps:"187"}
         result = i2c.getGainFactor(myparams, true);

            for(var j=0; j<myparams.steps; j++) {
              file.write(result.Frequency[j] + "," + 
                  1/(zcal*result.ImpedanceMod[j]) +","+ 
                  result.ImpedanceArg[j] + "\n");
              }

            file.end();
            btn.button('reset');
            $(".progress-bar").attr("style", "width: 0%;");
            alert("Calibration is completed!");
            };
      });

*/

    $("#ButtonSave").click(function() {
    	var filename = $("#SaveFileName").val();
    	if (filename == undefined | filename == "") {
    		alert("No file name chosen");
    	}
        else {
        	alert("Trying to save file: " + filename);
        	var dat = {};
        	dat["chartdata"] = chartData;
        	dat["Name"] = filename;
        	//console.log(dat);

        	$.post('/save/', dat,
        		function(response, status) {
        			//console.log(response);
        			if(response.save) { alert("File saved successfully"); }
        			if(response.error != undefined) { alert(response.error); }
        		});
    	}
    });

  // Button for Refresh
  $("#ButtonRefresh").click(refresh);


// Button for Sweep Low
    $("#ButtonSweepLow").click(function() {
      var filename = $("#SaveFileName").val();
      if (filename == undefined | filename == "") {
        alert("No file name chosen");
      }
      else{
        var btn = $(this);
        btn.button('Running sweep');
    	$(".progress-bar").attr("style", "width: 33%;");
        var start = $("#StartFreqL").val();
        var increment = $("#IncrFreqL").val();
        var numsteps = $("#NumStepsL").val();
        var data = {"range":"L",
                    "start":parseInt(start),
                    "increment":parseInt(increment),
                    "steps":parseInt(numsteps)};
        $.post('/sweep/', data,
            function(response, status) {
            //console.log(response);
            // function to create the chart data
            chartData.length=0;
			for(var i=0; i<response.SweepParameters.steps; i++) {
				var obj = {"f":response.Frequency[i],
						   "z":response.ImpedanceMod[i],
						   "phi":response.ImpedanceArg[i]}
				chartData.push(obj);
			}
            $(".progress-bar").attr("style", "width: 100%;");
            //console.log(chartData);
            
            // Empty any child in Div element and Render new graph in Div
            $("#gaindiv").empty();

            // Remove any existing tooltips from the last measurement
            $(".tooltip").remove();
            var line = prettyline()
                .$el(d3.select("#gaindiv"))
                .data(chartData)
                .render();

            btn.button('reset');
            $(".progress-bar").attr("style", "width: 0%;");
            });
      }
    });

  // Sweep High Button
    $("#ButtonSweepHigh").click(function() {

      var filename = $("#SaveFileName").val();
      if (filename == undefined | filename == "") {
        alert("No file name chosen");
      }
      else {
        var date = new Date();
        filename = filename + "_" + date.toISOString();
        var btn = $(this);
        btn.button('Running sweep');
    	
      $(".progress-bar").attr("style", "width: 33%;");
        var start = $("#StartFreqH").val();
        var increment = $("#IncrFreqH").val();
        var numsteps = $("#NumStepsH").val();
        var data = {"range": "H",
                    "start":parseInt(start),
                    "increment":parseInt(increment),
                    "steps":parseInt(numsteps)};
        $.post('/sweep/', data,
            function(response, status) {
            //console.log(response);
            // function to create the chart data
            chartData.length=0;
			for(var i=0; i<response.SweepParameters.steps; i++) {
				  var obj = {"f":response.Frequency[i],
						         "z":response.ImpedanceMod[i],
						         "phi":response.ImpedanceArg[i]}
				             chartData.push(obj);
			               }
            $(".progress-bar").attr("style", "width: 100%;");
            //console.log(chartData);


            // Empty any child in Div element and Render new graph in Div
            $("#gaindiv").empty();

            // Remove any existing tooltips from the last measurement
            $(".tooltip").remove();
            var line = prettyline()
                .$el(d3.select("#gaindiv"))
                .data(chartData)
                .render();

             var dat = {};
                dat["chartdata"] = chartData;
                dat["Name"] = filename;
                //console.log(dat);
                $(".progress-bar").attr("style", "width: 100%;");
                $.post('/save/', dat,
                  function(response, status) {
                console.log(response);
                if(response.save) { alert("File saved successfully"); }
                if(response.error != undefined) { alert(response.error); }
                btn.button('reset');
                $(".progress-bar").attr("style", "width: 0%;");
                });
           
            });
      }
    });


    // Specialized function for sweeping 1k to 30k.
    $("#ButtonSweep1kto30k").click(function() {

      var filename = $("#SaveFileName").val();
      if (filename == undefined | filename == "") {
        alert("No file name chosen");
      }
        else {
          var date = new Date();
          filename = filename + "_" + date.toISOString();
          var btn = $(this);
      btn.button('Running sweep');
      $(".progress-bar").attr("style", "width: 25%;");
      var start = $("#StartFreqM").val();
      var increment = $("#IncrFreqM").val();
      var numsteps = $("#NumStepsM").val();
      var data = {"range":"M",
            "start":parseInt(start),
            "increment":parseInt(increment),
            "steps":parseInt(numsteps)};
      $.post('/sweep/', data,
        function(response, status) {
        console.log(response);
        // function to create the chart data
        chartData.length=0;
        for(var i=0; i<response.SweepParameters.steps; i++) {
          var obj = {"f":response.Frequency[i],
                 "z":response.ImpedanceMod[i],
                 "phi":response.ImpedanceArg[i],
                 "zmean":response.ImpedanceModAvg[i],
                 "zsd":response.ImpedanceModSd[i],
                 "phimean":response.ImpedanceArgAvg[i],
                 "phisd":response.ImpedanceArgSd[i]}
          chartData.push(obj);
        }
        $(".progress-bar").attr("style", "width: 50%;");
        start = $("#StartFreqH").val();
        increment = $("#IncrFreqH").val();
        numsteps = $("#NumStepsH").val();
        data = {"range": "H",
            "start":parseInt(start),
            "increment":parseInt(increment),
            "steps":parseInt(numsteps)};
        $.post('/sweep/', data,
                function(response, status) {
                $(".progress-bar").attr("style", "width: 90%;");
              console.log(response);
              for(var i=0; i<response.SweepParameters.steps; i++) {
                            var obj = {"f":response.Frequency[i],
                                       "z":response.ImpedanceMod[i],
                                       "phi":response.ImpedanceArg[i],
                                       "zmean":response.ImpedanceModAvg[i],
                                       "zsd":response.ImpedanceModSd[i],
                                       "phimean":response.ImpedanceArgAvg[i],
                                       "phisd":response.ImpedanceArgSd[i]}
                                    chartData.push(obj);
              }
            //chart.validateData();                                 // chart rendering for AMchart
            //chart.validateNow();
            //alert("Trying to save file: " + filename);
            
            // Empty any child in Div element and Render new graph in Div

            $("#gaindiv").empty();

            // Remove any existing tooltips from the last measurement
            $(".tooltip").remove();
            var line = prettyline()
                .$el(d3.select("#gaindiv"))
                .data(chartData)
                .render();


            var dat = {};
            dat["chartdata"] = chartData;
            dat["Name"] = filename;
            console.log(dat);

            $.post('/save/', dat,
              function(response, status) {
                console.log(response);
                if(response.save) { alert("File saved successfully"); }
                if(response.error != undefined) { alert(response.error); }
                btn.button('reset');
                $(".progress-bar").attr("style", "width: 0%;");
            });
        });
      });
      }
    });

// Sweep Lo and Hi
    $("#ButtonSweepBoth").click(function() {

    	var filename = $("#SaveFileName").val();
    	if (filename == undefined | filename == "") {
    		alert("No file name chosen");
    	}
        else {
        	var date = new Date();
        	filename = filename + "_" + date.toISOString();
        	var btn = $(this);
			btn.button('Running sweep');
			$(".progress-bar").attr("style", "width: 25%;");
			var start = $("#StartFreqL").val();
			var increment = $("#IncrFreqL").val();
			var numsteps = $("#NumStepsL").val();
			var data = {"range":"L",
						"start":parseInt(start),
						"increment":parseInt(increment),
						"steps":parseInt(numsteps)};
			$.post('/sweep/', data,
				function(response, status) {
				console.log(response);
				// function to create the chart data
				chartData.length=0;
				for(var i=0; i<response.SweepParameters.steps; i++) {
					var obj = {"f":response.Frequency[i],
							   "z":response.ImpedanceMod[i],
							   "phi":response.ImpedanceArg[i],
							   "zmean":response.ImpedanceModAvg[i],
							   "zsd":response.ImpedanceModSd[i],
							   "phimean":response.ImpedanceArgAvg[i],
							   "phisd":response.ImpedanceArgSd[i]}
					chartData.push(obj);
				}
				$(".progress-bar").attr("style", "width: 50%;");
				start = $("#StartFreqH").val();
				increment = $("#IncrFreqH").val();
				numsteps = $("#NumStepsH").val();
				data = {"range": "H",
						"start":parseInt(start),
						"increment":parseInt(increment),
						"steps":parseInt(numsteps)};
				$.post('/sweep/', data,
                function(response, status) {
                $(".progress-bar").attr("style", "width: 90%;");
              console.log(response);
              for(var i=0; i<response.SweepParameters.steps; i++) {
                            var obj = {"f":response.Frequency[i],
                                       "z":response.ImpedanceMod[i],
                                       "phi":response.ImpedanceArg[i],
                                       "zmean":response.ImpedanceModAvg[i],
                                       "zsd":response.ImpedanceModSd[i],
                                       "phimean":response.ImpedanceArgAvg[i],
                                       "phisd":response.ImpedanceArgSd[i]}
                                    chartData.push(obj);
              }
			     
           // Empty any child in Div element and Render new graph in Div
            $("#gaindiv").empty();

            // Remove any existing tooltips from the last measurement
            $(".tooltip").remove();

            var line = prettyline()
                .$el(d3.select("#gaindiv"))
                .data(chartData)
                .render();

				 		//alert("Trying to save file: " + filename);
						var dat = {};
						dat["chartdata"] = chartData;
						dat["Name"] = filename;
						//console.log(dat);

						$.post('/save/', dat,
							function(response, status) {
								console.log(response);
								if(response.save) { alert("File saved successfully"); }
								if(response.error != undefined) { alert(response.error); }
								btn.button('reset');
								$(".progress-bar").attr("style", "width: 0%;");
						});
				});
			});
    	}
    });

    var check_filename = function() {
      var filename = $("#SaveFileName").val();
      if (filename == undefined | filename == "") {
    		alert("No file name chosen");
    	}
      else {
        var date = new Date();
        filename = filename + "_" + date.toISOString();
      }
      return(filename);
    }

    var push_data_on_stack = function(response, chartData) {
      for(var i=0; i<response.SweepParameters.steps; i++) {
            var obj = {"f":response.Frequency[i],
                   "z":response.ImpedanceMod[i],
                   "phi":response.ImpedanceArg[i],
                   "zmean":response.ImpedanceModAvg[i],
                   "zsd":response.ImpedanceModSd[i],
                   "phimean":response.ImpedanceArgAvg[i],
                   "phisd":response.ImpedanceArgSd[i]}
            chartData.push(obj);
				  }
			return (chartData);
		}

  $("#ButtonSweepAll").click(function() {
      // TODO - need to refactor this bit.

    	var filename = $("#SaveFileName").val();
    	if (filename == undefined | filename == "") {
    		alert("No file name chosen");
    	}
    	else{
			var date = new Date();
			filename = filename + "_" + date.toISOString();
			var btn = $(this);
			  btn.button('Running sweep');
			  $(".progress-bar").attr("style", "width: 20%;");
			  var start = $("#StartFreqL").val();
			  var increment = $("#IncrFreqL").val();
			  var numsteps = $("#NumStepsL").val();
			  var data = {"range":"L",
                    "start":parseInt(start),
                    "increment":parseInt(increment),
                    "steps":parseInt(numsteps)};
			  $.post('/sweep/', data,
				  function(response, status) {
				  console.log(response);
				  // function to create the chart data
				  chartData.length=0;
				  for(var i=0; i<response.SweepParameters.steps; i++) {
					var obj = {"f":response.Frequency[i],
							   "z":response.ImpedanceMod[i],
							   "phi":response.ImpedanceArg[i],
							   "zmean":response.ImpedanceModAvg[i],
							   "zsd":response.ImpedanceModSd[i],
							   "phimean":response.ImpedanceArgAvg[i],
							   "phisd":response.ImpedanceArgSd[i]}
					chartData.push(obj);
				}
				  $(".progress-bar").attr("style", "width: 50%;");
				  start = $("#StartFreqM").val();
				  increment = $("#IncrFreqM").val();
				  numsteps = $("#NumStepsM").val();
				  data = {"range": "M",
						  "start":parseInt(start),
						  "increment":parseInt(increment),
						  "steps":parseInt(numsteps)};
				  $.post('/sweep/', data,
					  function(response, status) {
						  $(".progress-bar").attr("style", "width: 66%;");
						  console.log(response);
						  for(var i=0; i<response.SweepParameters.steps; i++) {
						var obj = {"f":response.Frequency[i],
							   "z":response.ImpedanceMod[i],
							   "phi":response.ImpedanceArg[i],
							   "zmean":response.ImpedanceModAvg[i],
							   "zsd":response.ImpedanceModSd[i],
							   "phimean":response.ImpedanceArgAvg[i],
							   "phisd":response.ImpedanceArgSd[i]}
					chartData.push(obj);
					}
					$(".progress-bar").attr("style", "width: 80%;");	  
						 start = $("#StartFreqH").val();
						increment = $("#IncrFreqH").val();
						numsteps = $("#NumStepsH").val();
				       data = {"range": "H",
						"start":parseInt(start),
						"increment":parseInt(increment),
						"steps":parseInt(numsteps)};
					$.post('/sweep/', data,
					      function(response, status) {
					      $(".progress-bar").attr("style", "width: 90%;");
						  console.log(response);
						  for(var i=0; i<response.SweepParameters.steps; i++) {
                            var obj = {"f":response.Frequency[i],
                                       "z":response.ImpedanceMod[i],
                                       "phi":response.ImpedanceArg[i],
                                       "zmean":response.ImpedanceModAvg[i],
                                       "zsd":response.ImpedanceModSd[i],
                                       "phimean":response.ImpedanceArgAvg[i],
                                       "phisd":response.ImpedanceArgSd[i]}
                                    chartData.push(obj);
						  }
						  
					 // Empty any child in Div element and Render new graph in Div
            $("#gaindiv").empty();

            // Remove any existing tooltips from the last measurement
            $(".tooltip").remove();

            var line = prettyline()
                .$el(d3.select("#gaindiv"))
                .data(chartData)
                .render();

					        //alert("Trying to save file: " + filename);
						    var dat = {};
						    dat["chartdata"] = chartData;
						    dat["Name"] = filename;
						    //console.log(dat);
						    $(".progress-bar").attr("style", "width: 100%;");
						    $.post('/save/', dat,
						      function(response, status) {
								console.log(response);
								if(response.save) { alert("File saved successfully"); }
								if(response.error != undefined) { alert(response.error); }
								btn.button('reset');
								$(".progress-bar").attr("style", "width: 0%;");
					      });
						});
				});
			});
    	}
    });

    $("#ButtonDownload").click(function() {
        var filename = $("#FormFilename").val();
        var chartdatacsv = "Frequency, Magnitude, Phase\n";
        for(var i in chartData) {
        	var obj = chartData[i];
        	var string = obj.f +","+ obj.z +","+ obj.phi +"\n";
        	chartdatacsv += string;
        }

       	var a = document.createElement('a');
   		var blob = new Blob([chartdatacsv], {'type':'text/csv'});
   		a.href = window.URL.createObjectURL(blob);
   		a.download = filename;
   		a.click();

        //var uri = encodeURI(chartdatacsv);
        //window.open(uri);

    });

    $("#ButtonOpen").click(function() {
        $.get('/open/', function(data, status) {
            alert(data);
        });
    });

    $("#ButtonAnalyze").click(function() {
        var filename = $("#FormFilename").val();
        $.get('/analyze/' + filename , function(data, status) {
            alert(data);
        });
    });
});