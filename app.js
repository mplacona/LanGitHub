
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , GitHubApi = require("github");

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res){
	res.render('index', { title : 'Search repos by flavour'});
});

app.post('/language/', function(req,res){
	var language = req.body.language;
	var items = Array();
	
	var github = new GitHubApi({
    	version: "3.0.0"
  	});
  	  	
  	github.search.repos({
  		keyword: language
  	}, function(err, response){
  		if(err){
  			res.render('404',{ message: JSON.parse(err.message) });
  		} else {
  			var size,i;
  			var data = [];
  			size = response.repositories.length;
  			
  			for( i = 0; i < size; i++ ) {
  				result = {};
        		result.url = response.repositories[i].url;
        		result.name = response.repositories[i].name;
        		result.description = response.repositories[i].description; 
        		data.push(result);       		
      		}
      		
      		// send to the view
      		res.render('language', { title: 'Results for ' + language, items: data, records: size});
      	}
  	
  	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
