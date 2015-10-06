var multer = require("multer-pkgcloud"),
    randomString = require("../utils/randomString");

var handleFile = multer({
    dest: __dirname + '/../../uploads/tmp',
    putSingleFilesInArray: true,
    onError: function (error, next) {
        console.log(error);
        next(error)
    },
    rename: function () {
        return randomString(10);
    },
    onFileUploadStart: function (file) {
        console.log(file.originalname + ' is starting ...')
    },
    onFileUploadComplete: function (file, req, res) {
        console.log(file.fieldname + ' uploaded to  ' + file.path);
    }
});

module.exports = handleFile;