var mongoose = require('mongoose');
var log = require("../myWinston")(module);

mongoose.connect('mongodb://admin:admin@localhost:27017/boxmate');
var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB!");
});

var Schema = mongoose.Schema;

var Users = new Schema({
    id:{ type: String, index: true },
    name: {type:String, required: true},
    email: {type:String, required: true},
    password: { type: String, required: true},
    projects: Array,
    tasks: Array
}, {autoIndex: true});


// validation
//Users.path('title').validate(function (v) {
//    return v.length > 5 && v.length < 70;
//});

var UsersModel = mongoose.model('Users', Users);

module.exports.UsersModel = UsersModel;