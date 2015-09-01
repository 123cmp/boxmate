var express = require("express"),
    app = express(),
    mongoose = require('mongoose'),
    passport = require('passport'),
    flash = require('connect-flash'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    log = require("./modules/myWinston")(module),
    mongoStore = require("connect-mongo")(session);


mongoose.connect('mongodb://admin:admin@localhost:27017/boxmate', {server: { poolSize: 5 }});
var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback() {
    log.info("Connected to DB!");
});

require("./modules/passport")(passport); // pass passport for configuration

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    store: new mongoStore({mongooseConnection: mongoose.connection}),
    secret: "secret fraze",
    name: "session_id",
    rolling: true,
    resave: false,
    saveUninitialized: false
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

var api = require("./modules/api")(app, passport);

var sendfile = function (res, path) {
    res.sendFile(path, {root: __dirname});
};


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