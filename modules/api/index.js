var path = require('path');
var dataBase = require("../dataBase");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
//var RememberMeStrategy = require('passport-remember-me').Strategy;
var log = require("../myWinston")(module);
var sendfile = function (res, file) {
    res.sendFile(path.resolve(__dirname + '/../../front' + file));
};

module.exports = function (app) {

    app.use(cookieParser());
    app.use(bodyParser.json());

    var authorization = require("../authorization/authorization").initialize(app, dataBase);

    //app.use(passport.authenticate('local'));

    app.post("/api/login/", authorization.loginStandart, function(req, res){
        return res.send({status: 'OK'});
    });

    app.get("/api/logOut", function(req, res){
        res.clearCookie("remember_me");
        req.logout();
        res.redirect('/');
    });

    app.get("/api/templates/", function (req, res) {

    });
    app.get("/api/templates/:name", function (req, res) {
        sendfile(res, "/templates/" + req.params.name);
    });
    app.get("/api/users/",  authorization.isAuth ,function (req, res) {
        return res.send({status: 'OK'});
    });
    app.get("/api/users/:id", function (req, res) {

    });
    app.put("/api/users/", function (req, res) {

        dataBase.UsersModel.findOne({email: req.body.email}, function (err, article) {
            if (!article) {

                if (req.body.password != req.body.repeat) {
                    res.statusCode = 400;
                    res.send({error: 'Password mismatch'});
                }

                var user = new dataBase.UsersModel({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });

                user.save(function (err) {
                    if (!err) {
                        log.info("user created");
                        return res.send({status: 'OK'});
                    } else {
                        console.log(err);
                        if (err.name == 'ValidationError') {
                            res.statusCode = 400;
                            res.send({error: 'Validation error'});
                        } else {
                            res.statusCode = 500;
                            res.send({error: 'Server error'});
                        }
                        log.error('Internal error(%d): %s', res.statusCode, err.message);
                    }
                });

            } else {
                console.log(article);
                res.statusCode = 400;
                res.send({error: 'Email is not available'});

            }
        });

    });
    app.post("/api/users/", function (req, res) {

    });
    app.delete("/api/users/:id", function (req, res) {

    });
    app.get("/api/users/:userId/projects/", function (req, res) {

    });
    app.get("/api/projects/:id", function (req, res) {

    });
    app.put("/api/projects/", function (req, res) {

    });
    app.post("/api/projects/", function (req, res) {

    });
    app.delete("/api/projects/:id", function (req, res) {

    });
    app.get("/api/projects/:projectId/images", function (req, res) {

    });
    app.get("/api/images/:id", function (req, res) {

    });
    app.put("/api/images/", function (req, res) {

    });
    app.post("/api/images/", function (req, res) {

    });
    app.delete("/api/images/:id", function (req, res) {

    });
    app.get("/api/images/:imageId/tasks", function (req, res) {

    });
    app.get("/api/tasks/:id", function (req, res) {

    });
    app.put("/api/tasks/", function (req, res) {

    });
    app.post("/api/tasks/", function (req, res) {

    });
    app.delete("/api/tasks/:id", function (req, res) {

    });

    return this;
};
