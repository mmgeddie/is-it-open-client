var express 	= require('express');
var bodyParser 	= require('body-parser');
var path    	= require('path');
var MongoClient	= require('mongodb').MongoClient;
var app 		= express();

var mongoURL = "mongodb://heroku_app33940984:lt6u91j6n7ijsk01gmkbdel0mo@ds043447.mongolab.com:43447/heroku_app33940984";
app.set('port', (process.env.PORT || 5000));

app.use('/scripts', express.static(path.join(__dirname, './public/scripts')));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/establishments", function(req, res, next) {
    MongoClient.connect(mongoURL, function(err, db) {
		if(err) throw err;

		var collection = db.collection('establishments');

		// Locate all the entries using find
		collection.find().toArray(function(err, results) {
			res.send(JSON.stringify(results));
			// Let's close the db
			db.close();
		});
	});
});

app.post("/establishments", function(req, res, next) {
	if (req.body.name && req.body.time) {
		MongoClient.connect(mongoURL, function(err, db) {
			if(err) throw err;

			var collection = db.collection('establishments');

			collection.update({name:req.body.name}, {name:req.body.name, lastUpdate:req.body.time}, {upsert:true, w: 1}, function(err, result) {
			    if(err) throw err;
	    		res.send(req.body);
	    		db.close();
			});
		});
    	
	} else {
		res.status(400).send();
	}
});

app.post("/cloudmailin", function(req, res, next) {
	res.send(req.body);
	console.log(req.body);
});

app.all("/*", function(req, res, next) {
    res.sendFile("index.html", { root: path.join(__dirname, './public') });
});


app.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'));
});