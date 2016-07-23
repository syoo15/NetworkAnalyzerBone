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
			"f": 10,
			"z": 100,
			"zmean": 5000,
			"phi": 4,
			"phimean": 2,
		},
		{
			"f": 10000,
			"z": 500,
			"zmean": 40000,
			"phi":-4,
			"phimean":-2,
		},
		{
			"f": 100000,
			"z": 2000,
			"zmean":200,
			"phi":0,
			"phimean":-1,
		}
	];

	var maxz = d3.max(chartData, function(d){
		return d.z;
	});

	var chart = c3.generate({
			bindto: '#gaindiv',
			data: {
					json: chartData,
					keys: {
						x: 'f',
						value: ['z', 'phi']


					}
			},
			subchart: {
				show: true
			},
			axis: {
				x: {
					label: {
						text: 'Frequency (Hz)',
						position: 'outer-center'
					},
					tick: {
						count:3,
						values: [10, 10000, 100000],
						format: d3.format('s')
					}
				},
				y: {
					label: 'Impedance (ohms)',
					tick: {
						values: [0, maxz],
						format: d3.format('.0f'),
						count: 5

					}
				},
				y2: {
					show: true,
					label: 'Phase (rad)'
				}
			}


	});


function update(chartData){
	var maxz = d3.max(chartData, function(d){
		return d.z;
	});

	var chart = c3.generate({
			bindto: '#gaindiv',
			data: {
					json: chartData,
					keys: {
						x: 'f',
						value: ['z', 'phi']
					}
			},
			subchart: {
        show: true
    },
			axis: {
				x: {
					label: {
						text: 'Frequency (Hz)',
						position: 'outer-center'
					},
					tick: {
						count:3,
						values: [10, 10000, 100000],
						format: d3.format('.0f')
					}
				},
				y: {
					label: 'Impedance (ohms)',
					tick: {
						values: [0, maxz],
						format: d3.format('.3f'),
						count: 5

					}
				},
				y2: {
					show: true,
					label: 'Phase (rad)'
				}
			}
	});
}


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
                $("#StartFreqM").val(620);
                $("#IncrFreqM").val(100);
                $("#NumStepsM").val(50);
                $("#StartFreqH").val(6000);
                $("#IncrFreqH").val(500);
                $("#NumStepsH").val(187);
            }
            refreshDate();
        });
    };

    refresh();


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

    $("#ButtonRefresh").click(refresh);

    $("#ButtonSweepLow").click(function() {
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
            chart.validateData();
            chart.validateNow();
            btn.button('reset');
            $(".progress-bar").attr("style", "width: 0%;");
            });
    });

    $("#ButtonSweepHigh").click(function() {
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
            chart.validateData();
            chart.validateNow();
            btn.button('reset');
            $(".progress-bar").attr("style", "width: 0%;");
            });
    });

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
				//console.log(response);
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
						$(".progress-bar").attr("style", "width: 66%;");
						for(var i=0; i<response.SweepParameters.steps; i++) {
                            var obj = {"f":response.Frequency[i],
                                       "z":response.ImpedanceMod[i],
                                       "phi":response.ImpedanceArg[i],
                                       "zmean":response.ImpedanceModAvg[i],
                                       "zsd":response.ImpedanceModSd[i],
                                       "phimean":response.ImpedanceArgAvg[i],
                                       "phisd":response.ImpedanceArgSd[i]}
                                    chartData.push(obj);
							$(".progress-bar").attr("style", "width: 80%;");
						}

						chart.validateData();
						chart.validateNow();
				 		//alert("Trying to save file: " + filename);
						var dat = {};
						dat["chartdata"] = chartData;
						dat["Name"] = filename;
						//console.log(dat);

						$.post('/save/', dat,
							function(response, status) {
								//console.log(response);
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
    	filename = check_filename();

    	if(typeof filename != 'undefined') {
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
				  //console.log(response);
				  // function to create the chart data
				  chartData.length=0;
				  chartData = push_data_on_stack(response, chartData);

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
						  chartData = push_data_on_stack(response, chartData);
						  start = $("#StartFreqH").val();
				      increment = $("#IncrFreqH").val();
				      numsteps = $("#NumStepsH").val();
				      data = {"range": "H",
                      "start":parseInt(start),
                      "increment":parseInt(increment),
                      "steps":parseInt(numsteps)};
							$.post('/sweep/', data,
					      function(response, status) {
					      $(".progress-bar").attr("style", "width: 80%;");
					      chartData = push_data_on_stack(response, chartData);
								update(chartData);
								chart.validateData();
						    chart.validateNow();
					      //alert("Trying to save file: " + filename);
						    var dat = {};
						    dat["chartdata"] = chartData;
						    dat["Name"] = filename;

						    //console.log(dat);
						    $(".progress-bar").attr("style", "width: 100%;");

						    $.post('/save/', dat,
						      function(response, status) {

										//console.log(response);
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
