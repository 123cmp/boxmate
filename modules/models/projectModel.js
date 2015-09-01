var mongoose = require('mongoose');

var Projects = new mongoose.Schema({
    name: {type:String, required: true},
    options: mongoose.Schema.Types.Mixed,
    users: Array,
    images: Array,
    owner: {type: String, required: true}
}, {autoIndex: true});

module.exports = mongoose.model('Projects', Projects);
