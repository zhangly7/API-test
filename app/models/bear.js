// app/models/bear.js

var mongoose = require('mongoose');

var bearSchema = new mongoose.Schema({
	name: String
}, {
	collection: 'user'
});

var userSchema = new mongoose.Schema({
	id: String,
	ps: Number
}, {
	collection: 'users'
});

module.exports = mongoose.model('user', userSchema);