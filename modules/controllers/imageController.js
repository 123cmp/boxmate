var express = require("express"),
    router = express.Router(),
    fs = require.("fs-extra"),
    isLogedIn = require("../middlewares/checkAuth"),
    handleImage = require("../middlewares/handleImage");

router.post("/:id", isLogedIn, handleImage,function(req, res){
    Image.findById(req.params.id, function (err, image) {
        fs.move(req.files.file[0].path, image.path + "/" + image.revision + 1 +path.extname(req.files.file[0].path), function(err){
            if(err) res.sendStatus(500);
            image.revision++;
            image.save();
            res.sendStatus(200);
        });
    });
});