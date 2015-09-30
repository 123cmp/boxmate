var express = require("express"),
    app = express(),
    mongoose = require('mongoose'),
    Project = require("./modules/models/projectModel"),
    passport = require('passport'),
    flash = require('connect-flash'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    log = require("./modules/myWinston")(module),
    mongoStore = require("connect-mongo")(session);

mongoose.connect('mongodb://dbOwner:dbOwner@carbon.si:27017/mate', {server: { poolSize: 5 }});
var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback() {
    log.info("Connected to DB!");
});

require("./modules/passport")(passport);

app.use(cookieParser());
app.use(bodyParser.json());
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

app.get(/^(?!\/front).*.png$/, function(req, res){
    console.log("qwe");
    sendfile(res, "uploads"+req.url)
});

app.get('/', function (req, res) {
    sendfile(res, 'front/index.html');
});

app.get('/tests', function (req, res) {
    sendfile(res, 'front/tests.html');
});

app.get(/^\/front\/.+$/, function (req, res) {
    sendfile(res, req.url.replace("/", ""));
});

app.listen(9000, function () {
    log.info('Express server listening on port 9000');
});