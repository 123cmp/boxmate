var mongoose = require('mongoose');

var Users = new mongoose.Schema({
    id:{ type: String, index: true },
    name: {type:String, required: true},
    email: {type:String, required: true},
    password: { type: String, required: true},
    myProjects: [{ type:mongoose.Schema.Types.ObjectId, ref: "Projects"}],
    projects: Array,
    tasks: Array,
    subscribe: Boolean
}, {autoIndex: true});

module.exports = mongoose.model('Users', Users);