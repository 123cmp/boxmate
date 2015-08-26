var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoStore = require("connect-mongodb");

module.exports.initialize = function (app, dataBase) {

    app.use(session({
        store: mongoStore({
            dbname: "boxmate",
            host: "localhost",
            port: 27017,
            username: "admin",
            password: "admin"
        }),
        secret: 'keyboard cat'
    }));

    app.use(passport.initialize());
    app.use(passport.session());


    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        }, function (email, password, done) {
            dataBase.UsersModel.findOne({email: email}, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {message: 'Unknown user ' + email});
                }
                if (user.password != password) {
                    return done(null, false, {message: 'Invalid password'});
                }
                return done(null, user);
            });
        }
    ));

//passport.use(new RememberMeStrategy(
//    function(token, done) {
//        consumeRememberMeToken(token, function(err, uid) {
//            if (err) { return done(err); }
//            if (!uid) { return done(null, false); }
//
//            findById(uid, function(err, user) {
//                if (err) { return done(err); }
//                if (!user) { return done(null, false); }
//                return done(null, user);
//            });
//        });
//    },
//    issueToken
//));

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        dataBase.UsersModel.findById(id, function (err, user) {
            done(err, user);
        });
    });

    return this;
};

module.exports.loginStandart = function (req, res, next) {
    console.log("qqq");
    passport.authenticate('local', function(err, user, info){
        if(info){
            res.status(401);
            res.send(info);
        } else if(err){
            res.status(500);
        } else {
            next();
        }
    })(req, res, next);
};

module.exports.isAuth = function (req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
};



