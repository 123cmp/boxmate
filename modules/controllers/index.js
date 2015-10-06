var path = require('path'),
    log = require("../myWinston")(module),
    isLoggedIn = require("../middlewares/checkAuth");
    User = require("../models/userModel"),
    Project = require("../models/projectModel"),
    Image = require("../models/imageModel"),
    getRandomString = require("./utils").randomString,
    validate = require("./utils").validate,
    express = require("express"),
    router = express.Router(),
    multer = require("multer-pkgcloud"),
    fs = require("fs"),
    fse = require("fs-extra"),
    oneHour = 3600000,
    houersInDay = 24,
    Q = require("q");

var sendfile = function (res, file) {
    res.sendFile(path.resolve(__dirname + '/../../front' + file));
};

//var handleFile = multer({
//    dest: __dirname + '/../../uploads/',
//    putSingleFilesInArray: true,
//    onError: function (error, next) {
//        console.log(error);
//        next(error)
//    },
//    rename: function (fieldname, filename, req) {
//        return "original";
//    },
//    onFileUploadStart: function (file) {
//        console.log(file.originalname + ' is starting ...')
//    },
//    onFileUploadComplete: function (file, req, res) {
//        console.log(file.fieldname + ' uploaded to  ' + file.path);
//    },
//    onFileUploadData: function (file, data, req, res) {
//        res.write(JSON.stringify(file));
//    },
//    changeDest: function (dest, req, res) {
//        if (req.params.id) {
//            dest += req.params.id + "/" + getRandomString(20);
//            if (fs.existsSync(dest)) {
//                return dest;
//            } else {
//                fse.mkdirsSync(dest);
//                return dest;
//            }
//        } else {
//            return dest;
//        }
//    }
//});
module.exports = function (passport) {
    router.post("/login", function (req, res, next) {
        passport.authenticate('local-login', function (err, user, info) {
            if (err) {
                return res.sendStatus(500);
            }
            if (info){

                return res.status(401).send(info);
            }
            req.logIn(user, function (err) {
                if (err) {
                    return status(500).send(err);
                }
                if (req.body.remember_me) {
                    req.session.cookie.maxAge = 3 * houersInDay * oneHour; //3 days
                    return res.sendStatus(200);
                } else {
                    return res.sendStatus(200);
                }
            });
        })(req, res, next);
    }, function (req, res) {
    });

    router.get("/logOut", function (req, res) {
        req.logout();
        res.sendStatus(200);
    });

    router.get("/templates/", function (req, res) {

    });
    router.get("/templates/:name", function (req, res) {
        console.log("sending file");
        sendfile(res, "/templates/" + req.params.name);
    });

    router.use("/users", require("./usersController"));
    router.use("/projects", require("./projectsController"));

    //router.get("/projects/:id", isLoggedIn, function (req, res) {
    //    Project.findById(req.params.id, function (err, project) {
    //        if (!err && project) {
    //            res.send(project);
    //        } else if (!project) {
    //            res.sendStatus(404);
    //        } else {
    //            res.sendStatus(400);
    //        }
    //    });
    //});
    //
    //router.get("/projects", isLoggedIn, function (req, res) {
    //    Project.find({owner: req.session.passport.user}, {}, {sort: ["name"]}, function (err, projects) {
    //        if (projects && !err) {
    //            res.send(projects);
    //        }
    //        else if (err) {
    //            res.sendStatus(400);
    //        } else {
    //            res.sendStatus(404);
    //        }
    //    })
    //});
    //
    //router.put("/projects/", isLoggedIn, function (req, res) {
    //
    //    var project = new Project(req.body);
    //    project.owner = req.session.passport.user;
    //
    //    project.save(function (err) {
    //        if (!err) {
    //            User.findById(req.session.passport.user, function (err, user) {
    //                if (!err) {
    //                    user.myProjects.push(project._id);
    //                    user.save();
    //                }
    //            });
    //            return res.send({id: project._id});
    //        } else {
    //            if (err.name == 'ValidationError') {
    //                res.statusCode = 400;
    //                res.send({error: 'Validation error'});
    //            } else {
    //                res.statusCode = 500;
    //                res.send({error: 'Server error'});
    //            }
    //            log.error('Internal error(%d): %s', res.statusCode, err.message);
    //        }
    //    });
    //});
    //
    //router.put("/projects/:id/images/", isLoggedIn, handleFile, function (req, res) {
    //
    //    req.files.file.forEach(function (v) {
    //        var newImage = new Image({
    //            name: v.originalname,
    //            user: req.session.passport.user,
    //            project: req.params.id,
    //            path: v.path
    //        });
    //
    //        newImage.save(function (err, image) {
    //            if (!err) {
    //                Project.findById(req.params.id, function (err, project) {
    //                    if (!err) {
    //                        if (project.images) {
    //                            project.images.push(image._id);
    //                        } else {
    //                            project.images = [image._id];
    //                        }
    //                        project.save();
    //                    }
    //                });
    //            } else {
    //                if (err.name == 'ValidationError') {
    //                    res.statusCode = 400;
    //                    res.send({error: 'Validation error'});
    //                } else {
    //                    res.statusCode = 500;
    //                    res.send({error: 'Server error'});
    //                }
    //                log.error('Internal error(%d): %s', res.statusCode, err.message);
    //            }
    //        });
    //    });
    //});
    //
    //router.post("/projects/", function (req, res) {
    //
    //});
    //router.delete("/projects/:id", function (req, res) {
    //
    //});
    //router.get("/projects/:projectId/images", function (req, res) {
    //
    //});
    router.get("/images/:id/:rev", isLoggedIn, function (req, res) {
        Image.findById(req.params.id, function (err, image) {
            if (err) res.sendStatus(500);
            res.sendFile(path.resolve(image.path+"/" + req.params.rev + ".png"));
        })
    });

    router.post("/images/", function (req, res) {

    });
    router.delete("/images/:id", function (req, res) {

    });
    router.get("/images/:imageId/tasks", function (req, res) {

    });
    router.get("/tasks/:id", function (req, res) {

    });
    router.put("/tasks/", function (req, res) {

    });
    router.post("/tasks/", function (req, res) {

    });
    router.delete("/tasks/:id", function (req, res) {

    });

    return router;
};

//module.exports = router;

//function (router, passport) {
//
//
//
//    function isLoggedIn(req, res, next) {
//        if (req.isAuthenticated()) {
//            return next();
//        }
//
//        res.sendStatus(401);
//    }
//
//    return this;
//};
