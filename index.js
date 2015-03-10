var express = require('express');
var path    = require('path');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use('/scripts', express.static(path.join(__dirname, './public/scripts')));

app.all("/*", function(req, res, next) {
    res.sendFile("index.html", { root: path.join(__dirname, './public') });
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});