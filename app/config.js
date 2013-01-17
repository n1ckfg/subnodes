module.exports = function(app, exp) {

	app.configure(function(){
		app.set('views', app.root + '/app/server/views');
		app.set('view engine', 'jade');
		app.set('view options', { doctype: 'html', pretty: true });
		app.use(exp.logger('dev'));
  		app.use(exp.bodyParser());
		app.use(exp.methodOverride());
		app.use(exp.static(app.root + '/app/server'));
		app.use(require('stylus').middleware({
	        src: app.root + '/app/public',
	        compress: true
	    }));
		app.use(exp.static(app.root + '/app/public'));
	});

	app.configure('development', function(){
	  app.use(exp.errorHandler({ dumpExceptions: true, showStack: true }));
	});

	app.configure('production', function(){
	  app.use(exp.errorHandler());
	});

	// rewrite URL to hotprobs.com
	app.configure('production', function(){
		app.use(function(req, res, next){
			var hostname = req.header("host").split(":")[0];
			if (hostname != "www.hotprobs.com") {
				res.redirect('http://www.hotprobs.com');
				return;
			}
			next();
		});
	});

	/*app.use(function(req, res, next){
		res.render('404');
	});*/

}