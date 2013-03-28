exports.index = function(req, res){
  res.render('index', { title: 'Search repos by flavour' });
};