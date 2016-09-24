var APIService = require('./develop/apiKey');
var API = new APIService();

var express = require('express');
var request = require('request');
var app = express();

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
                    answer = JSON.parse(body).quoteText
                }
                catch (e) {
                    answer = 'Ошибка'
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

app.get('/public/assets/*', function (req, res) {
    res.sendfile(__dirname + req.url)
});

app.post('*', function (req, res) {
    res.status(404).send('404');
});

app.get('*', function (req, res) {
    res.status(404).send('404');
});

app.listen(3000, function () {
    console.log('App run!');
});

function randomInteger(min, max) {
    var rand = min + Math.random() * (max - min)
    rand = Math.round(rand);
    return rand;
}