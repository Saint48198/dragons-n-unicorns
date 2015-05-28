var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
    res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
    res.render('layout', { title: 'Express' });
});

module.exports = router;