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
			"f": 1,
			"z": 0.5,
			"phi":1,
		},
		{
			"f": 11,
			"z": 10.4,
			"phi":1,
		},
		{
			"f": 12,
			"z": 11.7,
			"phi":1,
		}
	];
    
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
	//xAxis.logarithmic = true;
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
	graph1.lineAlpha = 0.5;
	graph1.lineThickness = 2;
	//graph1.bullet = "round";
	chart.addGraph(graph1);

	var graph2 = new AmCharts.AmGraph();
	graph2.yAxis = pAxis;
	graph2.lineColor = "#69A55C";
	graph2.balloonText = "f:[[x]] Phi:[[y]]";
	graph2.xField = "f";
	graph2.yField = "phi";
	graph2.lineAlpha = 0.5;
	graph2.lineThickness = 2;
	//graph2.bullet = "round";
	chart.addGraph(graph2);
	// CURSOR
	var chartCursor = new AmCharts.ChartCursor();
	chart.addChartCursor(chartCursor);

	// SCROLLBAR

	//var chartScrollbar = new AmCharts.ChartScrollbar();
	//chart.addChartScrollbar(chartScrollbar);

	// WRITE                                                
	chart.write("gaindiv");

    var refresh = function() {
        $.get('/refresh', function(data, status) {
            if(data == undefined) {
                document.getElementById("statustext").innerHTML = "No device found";
            }
            else {
                $("#statustext").html("Device address " + 
                	data.DeviceAddress + " Temperature: " + data.Temperature + " deg C");
                $("#StartFreq").val(100);
                $("#IncrFreq").val(1000);
                $("#NumSteps").val(10);
            }
            refreshDate();
        });
    };
    
    refresh();

    
    $("#ButtonSave").click(function() {
        alert("Trying to save");
    });
    
    $("#ButtonRefresh").click(refresh);

    $("#ButtonSweep").click(function() {
    	$(".bar").attr("style", "width: 25%;");
        var start = $("#StartFreq").val();
        var increment = $("#IncrFreq").val();
        var numsteps = $("#NumSteps").val();
        var data = {"start":parseInt(start), 
                    "increment":parseInt(increment), 
                    "steps":parseInt(numsteps)};
        $.post('/sweep/', data,
            function(response, status) {
            //console.log(response);
            // function to create the chart data
            chartData.length=0;
			for(var i=1; i<response.SweepParameters.steps; i++) {
			// setting i=1 to drop the first data point. 
				var obj = {"f":response.Frequency[i], 
						   "z":response.ImpedanceMod[i], 
						   "phi":response.ImpedanceArg[i]}
				chartData.push(obj);
			}
            
            //console.log(chartData);  
            chart.validateData();  
            chart.validateNow();    
            alert("Done");
            });
        });
    });
    
    $("#ButtonSave").click(function() {
        var filename = $("#FormFilename").val();
        $.get('/save/' + filename , function(data, status) {
            alert(data);
        });
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
        