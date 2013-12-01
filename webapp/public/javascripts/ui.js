$(document).ready(function() {
    $("#ButtonSave").click(function() {
        alert("Trying to save");
    });
    $("#ButtonRefresh").click(function() {
        $.get('/refresh/', function(data, status) {
            alert(data);
        });
    });
    $("#ButtonSweep").click(function() {
        var start = $("#StartFreq").val();
        var increment = $("#IncrFreq").val();
        var numsteps = $("#NumSteps").val();
        $.get('/sweep/' + start + '/' + increment + '/' + numsteps, 
            function(data, status) {
            alert(data);
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
        