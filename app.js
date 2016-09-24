var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/public/index.html')
});

app.get('/js/*.js', function (req, res) {
    res.sendfile(__dirname + '/public/' + req.url)
});

app.listen(3000, function () {
    console.log('App run!');
});