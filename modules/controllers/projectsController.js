var express = require("express"),
    isLoggedIn = require("../middlewares/checkAuth"),
    handleFile = require("../middlewares/handleImage"),
    Project = require("../models/projectModel"),
    router = express.Router(),
    underscore = require("underscore"),
    each = underscore.each,
    has = underscore.has,
    fs = require("fs-extra"),
    randomString = require("../utils/randomString"),
    path = require("path");

router.get("/", isLoggedIn, function(req, res){
    Project.find({$or:[
        {owner: req.session.passport.user},
        {users: [req.user.email]}
    ]},  {}, {sort: ["name"]}).populate("owner", "_id, name").populate("images", "_id, name").exec(function(err, projects){
        res.send(projects)
    })
});

router.put("/", isLoggedIn, function (req, res) {

    var project = new Project(req.body);
    project.owner = req.session.passport.user;

    project.save(function (err) {
        if (!err) {
            User.findById(req.session.passport.user, function (err, user) {
                if (!err) {
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

router.put("/:id/images/", isLoggedIn, handleFile, function (req, res) {
    var newPath = path.resolve(__dirname + "" + "../../../uploads/" + req.params.id);
    var currentImgPath;
    req.files.file.forEach(function (v) {
        currentImgPath = newPath + "/" + randomString(10) +  "/0" + path.extname(v.path);
        fs.move(v.path, currentImgPath, function(err){
            if(err) return res.sendStatus(500);

            var newImage = new Image({
                name: v.originalname,
                user: req.session.passport.user,
                project: req.params.id,
                path: path.dirname(currentImgPath)
            });

            newImage.save(function (err, image) {
                if (!err) {

                    Project.findById(req.params.id, function (err, project) {
                        if (!err) {
                            if (project.images) {
                                project.images.push(image._id);
                            } else {
                                project.images = [image._id];
                            }
                            project.save();
                            return res.sendStatus(200);
                        }
                    });

                } else {
                    if (err.name == 'ValidationError') {
                        res.statusCode = 400;
                        res.send({error: 'Validation error'});
                    } else {
                        res.statusCode = 500;
                        res.send({error: 'Server error'});
                    }
                }
            });
        });
    });
});


router.post("/:id", function (req, res) {
    Project.findById(req.params.id, function (err, project) {
        console.log("name" in project);
        if (err) return res.status(500).send(err);
        validate(req.body, "updateProject").then(function () {
            each(req.body, function (v, i) {
                //TODO check this shit later
                console.log(i);
                console.log(i in project);
                if (i in project) {
                    console.log(project[i], body[i]);
                    project[i] = body[i];
                }
                console.log("here");
            });
            console.log(project);
            project.save();
            return res.sendStatus(200);
        }, function (err) {
            return res.status(500).send(err);
        })
    })
});

router.get("/my", isLoggedIn, function (req, res) {
    Project.find({owner: req.session.passport.user}, {}, {sort: ["name"]}, function (err, projects) {
        if (projects && !err) {
            res.send(projects);
        }
        else if (err) {
            res.sendStatus(400);
        } else {
            res.sendStatus(404);
        }
    })
});

router.get("/open", isLoggedIn, function (req, res) {
    Project.find({$and:[
        {$or:[
            {owner: req.params.id},
            {users: [req.user.email]}
        ]},
        {status: "open"}
    ]}, {}, {sort: ["name"]}, function (err, project) {
        if (!err && project) {
            res.send(project);
        } else if (!project) {
            res.sendStatus(404);
        } else {
            res.sendStatus(400);
        }
    });
});

router.get("/close", isLoggedIn, function (req, res) {
    Project.find({$and:[
        {$or:[
            {owner: req.params.id},
            {users: [req.user.email]}
        ]},
        {status: "close"}
    ]}, {}, {sort: ["name"]}, function (err, project) {
        if (!err && project) {
            res.send(project);
        } else if (!project) {
            res.sendStatus(404);
        } else {
            res.sendStatus(400);
        }
    });
});

router.get("/:id", isLoggedIn, function (req, res) {
    Project.findById(req.params.id, function (err, project) {
        if (!err && project) {
            res.send(project);
        } else if (!project) {
            res.sendStatus(404);
        } else {
            res.sendStatus(400);
        }
    });
});

router.delete("/:id", function (req, res) {

});

router.get("/:projectId/images", function (req, res) {

});


module.exports = router;