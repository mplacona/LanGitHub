var GitHubApi = require("github");

exports.view = function(req, res){
	var language = "";
	if(typeof req.params.language != 'undefined'){
		language = req.params.language;
	}
	else{
		language = req.body.language;
	}
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
};