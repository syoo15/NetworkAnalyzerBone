
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.directory(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  app.locals.pretty = true;
}

app.get('/', routes.index);

app.get('/refresh', function(req, res){
  res.send("refreshed");
  });
  
app.get('/download/:file', function(req, res){
  res.send("downloaded");
  });
  
app.get('/open', function(req, res){
  res.send("opened");
  });
  
app.post('/sweep/:sweep', function(req, res){
  res.send("swept");
  });
  
app.post('/analyze/:file', function(req, res){
  res.send("analyzed");
  });
  
app.post('/save/:filename', function(req, res){
  res.send("saved");
  });
  

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
