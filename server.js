var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var mongoose = require('mongoose');
var uri = 'mongodb://zhangly7:335506Mongo!@luyaomongo1-shard-00-00-mscg2.mongodb.net:27017,' +
	'luyaomongo1-shard-00-01-mscg2.mongodb.net:27017,' +
	'luyaomongo1-shard-00-02-mscg2.mongodb.net:27017/' +
	'test?ssl=true&replicaSet=luyaoMongo1-shard-0&authSource=admin';
mongoose.connect(uri);


var router = express.Router();

router.get('/',function(req, res) {
	res.json({ message: 'runs pretty well'});
});

app.use('/api',router);

app.listen(port);
console.log('Magic happens on port ' + port);