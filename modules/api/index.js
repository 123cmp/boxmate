var path = require('path');
var log = require("../myWinston")(module);
var User = require("../models/userModel"),
    Token = require("../passport/Token");
var sendfile = function (res, file) {
    res.sendFile(path.resolve(__dirname + '/../../front' + file));
};

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
                log.info(req.body);
                if (req.body.remember_me) {

                    Token.issueToken(req.user, function (err, token) {
                        if (err) {
                            return next(err);
                        }
                        res.cookie('remember_me', token, {path: '/', httpOnly: false, maxAge: 604800000});
                        return res.send({id: user._id});
                    });
                } else {
                    return res.send({id: user._id});
                }
            });
        })(req, res, next);
    }, function (req, res) {
    });

    app.get("/api/logOut", function (req, res) {
        res.clearCookie('remember_me');
        req.logout();
        res.sendStatus(200);
    });

    app.get("/api/templates/", function (req, res) {

    });
    app.get("/api/templates/:name", function (req, res) {
        sendfile(res, "/templates/" + req.params.name);
    });
    app.get("/api/users/", isLoggedIn, function (req, res) {
        console.log(req.cookies);
        return res.send({status: 'OK'});
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

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            console.log(req.user)
            return next();
        }

        res.send(401);
    }

    return this;
};
