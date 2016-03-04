//var users = require('./users');
var app = require('express')();
var mongojs = require('./db');
var db = mongojs.connect;
var bodyParser = require('body-parser');

var port = process.env.PORT || 7777;

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//home
app.get('/', function (req, res) {
    //res.send('<h1>Hello Node.js</h1>');
	db.users.count(function(err, result) {
        if (result <= 0) {
            db.users.insert(users.findAll(), function(err, docs) {
                // insert new data.
            });
        } 
        res.send('<h1>Hello Node.js</h1>');
    });
});

//home/index
app.get('/index', function (req, res) {
    res.send('<h1>This is index page</h1>');
});


app.get('/user', function (req, res) {
    //res.json(users.findAll());
	db.users.find(function(err, docs){
		res.json(docs);
	});
});

//http://localhost:7777/user/3
app.get('/user/:id', function (req, res) {
    //var id = req.params.id;
    //res.json(users.findById(id));
	var id = parseInt(req.params.id);
	db.users.findOne({id: id}, function(err, docs) {
        res.json(docs);
    });
});

app.post('/newuser', function (req, res) {
    var json = req.body;
    //console.log(json);
    //res.send('Add new ' + json.name + ' Completed!');
	db.users.insert(json, function(err, docs) {
        res.send('Add new ' + docs.name + ' Completed!');
    });
});

app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});