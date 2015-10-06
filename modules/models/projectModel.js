var mongoose = require('mongoose');

var Projects = new mongoose.Schema({
    name: {type:String, required: true},
    options: mongoose.Schema.Types.Mixed,
    users: Array,
    images: [{type: mongoose.Schema.Types.ObjectId, ref: "Images"}],
    owner: {type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true},
    status: {type: String, default: "open"}
}, {autoIndex: true});

module.exports = mongoose.model('Projects', Projects);
