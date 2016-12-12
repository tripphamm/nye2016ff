var express = require('express');
var bodyParser= require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var db; // will be set on MongoClient.connect
var app = express();

app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
    var cursor = db.collection('urls').find();
    cursor.toArray(function(err, results) {
        res.render(__dirname + '/views/index', { results: results })
    });
});

app.get('/litCheck', function(req, res) {
    res.sendFile(__dirname + '/views/litCheck.html');
});

app.get('/manage', function(req, res) {
    res.sendFile(__dirname + '/views/manage.html')
});


app.post('/create', function(req, res) {
    db.collection('urls').save(req.body, function(err, result) {
        if (err) return console.log(err);
        res.redirect('/')
    });
});

MongoClient.connect('mongodb://dev:friskydingo@ds133368.mlab.com:33368/ejh891_devdb', function(err, database) {
    if (err) return console.log(err);
    db = database;
    app.listen(3000, function() {
        console.log('listening on 3000')
    });
});