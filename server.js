var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var mongoose = require('mongoose');
var uri = 'mongodb://zhangly7:335506Mongo!@luyaomongo1-shard-00-00-mscg2.mongodb.net:27017,' +
	'luyaomongo1-shard-00-01-mscg2.mongodb.net:27017,' +
	'luyaomongo1-shard-00-02-mscg2.mongodb.net:27017/APItest' +
	'?ssl=true&replicaSet=luyaoMongo1-shard-0&authSource=admin';
mongoose.connect(uri,{useMongoClient: true});

var bear = require('./app/models/bear');
var user = require('./app/models/bear');
var lovelyBear = new bear ({ name: "lovelyBabyBear" });
// lovelyBear.save(function (err) {
// 	if (err) console.log('Error on save!');
// 	else console.log('lovelyBear saved!');
// });
//bear.create({name:"Baby Bear"}).then(doc=>console.log("created a baby bear"));

var router = express.Router();

router.use(function(req, res, next) {
	console.log('routing now!');
	next();
});

router.get('/',function(req, res) {
	res.json({ message: 'runs pretty well'});
});

router.route("/users/:cutoff")
	.get(function(req, res) {
		var cutoff = req.params.cutoff;
		var calculateSum = function(cutoff, callback) {
			console.log("cutoff = ", cutoff);
			user.aggregate({ $match: { "ps": {$gt: cutoff}}},
									 { $group: { _id: null, sum: { $sum: "$ps"}}}),
			function(err, result) {
				if (err) {
					console.log(err);
					return;
				}
				console.log(result);
			}
		};
		calculateSum(cutoff, function(err, result) {
			if (err) {
				console.log(err);
				return;
			} else {
				res.json(result);
			}
		})
	});

app.use('/api',router);

app.listen(port);
console.log('Magic happens on port ' + port);