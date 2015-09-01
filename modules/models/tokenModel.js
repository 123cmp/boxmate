var mongoose = require('mongoose');

var Tokens = new mongoose.Schema({
    token:{ type: String, require: true },
    userId: { type:String, required: true },
    createdAt: { type: Date, expires: "1m" }
}, {autoIndex: false});

module.exports = mongoose.model('Tokens', Tokens);