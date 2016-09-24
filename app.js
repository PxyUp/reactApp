var APIService = require('./develop/apiKey');
var API = new APIService();
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey = fs.readFileSync('ssl/localhost.key', 'utf8');
var certificate = fs.readFileSync('ssl/localhost.crt', 'utf8');
var express = require('express');
var request = require('request');
var app = express();
var credentials = {key: privateKey, cert: certificate};
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/public/index.html')
});

app.post('/forismatic/:id?', function (req, res) {
    var id = req.params.id || randomInteger(1, 999999);
    request.post(
        'http://api.forismatic.com/api/1.0/',
        {
            form: {
                method: 'getQuote',
                key: id,
                format: 'json',
                lang: 'ru'
            }
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var answer;
                try {
                    answer = JSON.parse(body)
                }
                catch (e) {
                    answer = {err: true}
                }
                finally {
                    res.send({err: false, answer: answer});
                }

            } else {
                res.json({err: true})
            }
        }
    );

});

app.post('/github/:login?', function (req, res) {
    var login = req.params.login || 'pxyup';
    var options = {
        url: 'https://api.github.com/users/' + login,
        headers: {
            'User-Agent': 'request'
        }
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json(JSON.parse(body))
        }
    };
    request(options, callback);

});


app.get('/public/assets/*', function (req, res) {
    res.sendfile(__dirname + req.url)
});

app.post('*', function (req, res) {
    res.status(404).send('404');
});

app.get('*', function (req, res) {
    res.status(404).send('404');
});

httpServer.listen(8080);
httpsServer.listen(10001);

function randomInteger(min, max) {
    var rand = min + Math.random() * (max - min)
    rand = Math.round(rand);
    return rand;
}