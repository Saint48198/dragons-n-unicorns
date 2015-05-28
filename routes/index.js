var express = require('express');
var request = require('request');
var md5 = require('MD5');
var router = express.Router();


/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/layout', function(req, res) {
    res.render('layout', { title: 'Express' });
});

router.get('/api', function(req, res){
    var public = '08f81a2cea9ac0ca9e8d6672657c976a';
    var private = 'd6af5b0a2c97da239e237e45d64ebb2c49b21d28';
    var ts = Date.now().toString();
    var hash = md5(ts + private + public);
    var url = 'http://gateway.marvel.com/v1/public/characters?apikey=' + public + '&ts=' + ts + '&hash=' + hash;

    if (req.query.nameStartsWith) {
        url += "&nameStartsWith=" + req.query.nameStartsWith;
        var options = {
            url: url
        };

        request(url, function (error, response, body) {
            if (!error && (response.statusCode == 200 || response.statusCode == 304)) {
                res.setHeader('Content-Type', 'application/json');
                res.send(body);
            }
        });
    }

});

module.exports = router;
