var express = require("express");
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var log = require("./modules/myWinston")(module);


mongoose.connect('mongodb://admin:admin@localhost:27017/boxmate');
var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB!");
});

require("./modules/passport")(passport); // pass passport for configuration

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

var api = require("./modules/api")(app, passport);

//
//var File = mongoose.model('File', FileSchema);

//var multer = require('multer');

var sendfile = function (res, path) {
    res.sendFile(path , { root : __dirname});
};
//
//app.use(multer({
//    dest: './uploads/',
//    rename: function (fieldname, filename) {
//        return filename + Date.now();
//    },
//    onFileUploadStart: function (file) {
//        console.log(file.originalname + ' is starting ...')
//    },
//    onFileUploadComplete: function (file) {
//        console.log(file.fieldname + ' uploaded to  ' + file.path);
//    },
//    onFileUploadData: function (file, data, req, res) {
//        res.write(JSON.stringify(file));
//    }
//}).single("files"));

//app.use(express.static(path.join(__dirname, "front")));


app.get('/', function (req, res) {
    sendfile(res, 'front/index.html');
});


app.get(/^\/front\/.+$/, function (req, res) {
    sendfile(res, req.url.replace("/", ""));

});


app.listen(9000, function () {
    log.info('Express server listening on port 9000');
});

//
//
//app.get('/api/templates/:name', function (req, res) {
//    sendfile(res, 'front/templates/'+req.params.name);
//});
//
//app.get('/api/templates', function (req, res) {
//    glob("front/templates/*", {}, function (er, files) {
//        res.send(files);
//    });
//});
//
//app.post('/upload', function (req, res) {
//    console.log(req.body); // form fields
//    console.log(req.files); // form files
//    res.status(200).end()
//});


var errors = require('./modules/errorsHandler')(app);