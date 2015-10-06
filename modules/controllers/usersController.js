var express = require("express"),
    isLoggedIn = require("../middlewares/checkAuth"),
    User = require("../models/userModel"),
    Project = require("../models/projectModel"),
    handleImage = require("../middlewares/handleImage"),
    router = express.Router(),
    underscore = require("underscore"),
    each = underscore.each,
    has = underscore.has,
    twoMonthsTimestamp = 5184000000,
    fs = require("fs-extra"),
    path = require("path");

router.get("/", isLoggedIn, function (req, res) {
    User.findById(req.session.passport.user, "name email myProjects projects", function (err, user) {
        if (err) return res.sendStatus(500);
        console.log(user);
        return res.send(user)
    })
});

router.get("/:id", isLoggedIn, function (req, res) {
    console.log(req.session);
    User.findOne({_id: req.params.id}, "name myProjects projects deleted", function (err, user) {
        if (err) return res.status(500).send(err);
        return res.send(user);
    });
});

router.put("/", function (req, res) {
    User.findOne({email: req.body.email}, function (err, user) {
        if (!user) {
            validate(req.body, "registration").then(function (result) {
                console.log(result);
                if (result == false) {
                    console.log("sending 400");
                    return res.status(400).send({error: "validation error"});
                }


                var user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });

                user.save(function (err) {
                    if (!err) {
                        return res.status(200).send(user);
                    } else {
                        console.log(err);
                        if (err.name == 'ValidationError') {
                            res.status(400).send({error: 'Validation error'});
                        } else {
                            res.status(500).send({error: 'Server error'});
                        }
                        log.error('Internal error(%d): %s', res.statusCode, err.message);
                    }
                });

            });
        } else {
            res.status(409).send({error: 'Email is not available'});
        }
    });

});

router.put("/avatar",isLoggedIn, handleImage, function (req, res) {
    var newPath = path.resolve(__dirname + "" + "../../../uploads/avatars/" + req.session.passport.user + path.extname(req.files.file[0].path));
    console.log(req.files.file[0].path);
    fs.move(req.files.file[0].path, newPath, function(err){
        if(err) res.sendStatus(500);
        User.findById(req.user._id, function (err, user) {
            if(err) res.sendStatus(500);
            user.avatar = "true";
            user.save();
            res.sendStatus(200);
        });
    });
});

router.post("/", isLoggedIn, function (req, res) {
    User.findById(req.session.passport.user, function (err, user) {
        if (err) return res.status(500).send(err);
        validate(req.body, "updateUser").then(function () {
            each(req.body, function (v) {
                if (has(user, v)) user[v] = body[v];
            });
            user.save();
            return res.send(200);
        }, function (err) {
            return res.status(500).send(err);
        })
    })
});

router.delete("/", isLoggedIn, function (req, res) {
    var projects = [];
    User.findById(req.session.passport.user, function (err, user) {
        if (err) return res.sendStatus(500);
        user.expirationDate = new Date().getTime() + twoMonthsTimestamp;
        each(user.myProjects, function (v) {
            Project.findByIdAndUpdate(v, {status: 'archive'}, function (err, project) {
                err = true;
                if (err) {
                    cancelDeleting(projects);
                    console.log("sending 500");
                    return res.sendStatus(500);
                }
                projects.push({id: v, project: project})
            })
        });
        user.save();
        console.log("sending 200");
        res.sendStatus(200);
    });
});

module.exports = router;

function cancelDeleting(projects) {
    each(projects, function(i, v){
        Project.findByIdAndUpdate(v.id, {status: v.status}, function(err, project){})
    })
}