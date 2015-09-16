var mongoose = require('mongoose');

var Images = new mongoose.Schema({
    name: {type:String, required: true},
    path: {type:String, required: true},
    user: {type: String, required: true},
    tasks: Array,
    project: {type: String, required: true}
}, {autoIndex: true});

module.exports = mongoose.model('Images', Images);
