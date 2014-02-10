$(document).ready(function() {
	var refreshDate = function() {
		var date = new Date();
    	var field = document.getElementById("date");
    	field.innerHTML = date.toString();
    	};
    
    refreshDate();
    
    var refresh = function() {
        $.get('/refresh', function(data, status) {
            document.getElementById("statustext").innerHTML = data;
            refreshDate();
        });
    };
    
    refresh();

    
    $("#ButtonSave").click(function() {
        alert("Trying to save");
    });
    
    $("#ButtonRefresh").click(refresh);

    $("#ButtonSweep").click(function() {
        var start = $("#StartFreq").val();
        var increment = $("#IncrFreq").val();
        var numsteps = $("#NumSteps").val();
        var data = {"start":start, "increment":increment, "steps":numsteps};
        $.post('/sweep/', data,
            function(response, status) {
            alert(response);
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
        $.get('/download/' + filename , function(data, status) {
            alert(data);
        });
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
        