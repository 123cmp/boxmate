var mongoose = require('mongoose');

var Users = new mongoose.Schema({
    id: {type: String, index: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    myProjects: [{type: mongoose.Schema.Types.ObjectId, ref: "Projects"}],
    projects: [{type: mongoose.Schema.Types.ObjectId, ref: "Projects"}],
    avatar: Boolean,
    tasks: Array,
    subscribe: Boolean,
    expirationDate: {type: Date, expires: 0},
    createdAt: {type: Date, default: Date.now},
    deleted: {type: Boolean, default: false}
}, {autoIndex: true});

module.exports = mongoose.model('Users', Users);