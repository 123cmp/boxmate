var path = require('path');
var log = require("../myWinston")(module);
var User = require("../models/userModel"),
    Project = require("../models/projectModel");
var sendfile = function (res, file) {
    res.sendFile(path.resolve(__dirname + '/../../front' + file));
};

var oneHour = 3600000,
    houersInDay = 24;

module.exports = function (app, passport) {

    app.post("/api/login/", function (req, res, next) {
        passport.authenticate('local-login', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (info) {
                res.status(400);
                return res.send(info);
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                if (req.body.remember_me) {
                    req.session.cookie.maxAge = 3*houersInDay*oneHour;
                    return res.sendStatus(200);
                } else {
                    return res.sendStatus(200);
                }
            });
        })(req, res, next);
    }, function (req, res) {
    });

    app.get("/api/logOut", function (req, res) {
        req.logout();
        res.sendStatus(200);
    });

    app.get("/api/templates/", function (req, res) {

    });
    app.get("/api/templates/:name", function (req, res) {
        sendfile(res, "/templates/" + req.params.name);
    });
    app.get("/api/users/", isLoggedIn, function (req, res) {
        return res.send({message: req.session});
    });

    app.get("/api/users/:id", function (req, res) {

    });
    app.put("/api/users/", function (req, res) {
        User.findOne({email: req.body.email}, function (err, article) {
            if (!article) {

                if (req.body.password != req.body.repeat) {
                    res.statusCode = 400;
                    res.send({error: 'Password mismatch'});
                }

                var user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });

                user.save(function (err) {
                    if (!err) {
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

    app.get("/api/projects/:id", isLoggedIn, function (req, res) {
        Project.findById(req.id, function(err, project){
            if(!err && project) res.send(project);
            else if(!project) res.sendStatus(404);
            else res.sendStatus(400);
        });
    });

    app.get("/api/projects", isLoggedIn, function(req, res){
        Project.find({owner: req.session.passport.user}, function(err, projects){
            if(projects && !err) res.send(projects);
            else if(err) res.sendStatus(400);
            else res.sendStatus(404);
        })
    });

    app.put("/api/projects/", isLoggedIn, function (req, res) {
        var project = new Project(req.body);
        project.owner = req.session.passport.user;

        project.save(function(err){
            if(!err){
                User.findById(req.session.passport.user, function(err, user){
                    console.log(user);
                    if(!err){
                        user.myProjects.push(project._id);
                        user.save();
                    }
                });
                return res.send({id: project._id});
            } else {
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

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.sendStatus(401);
    }

    return this;
};
