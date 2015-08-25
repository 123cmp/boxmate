var express = require("express");
var app = express();
var myWinston = require("./modules/myWinston")(module);
var path = require('path');
//var FileSchema = new mongoose.Schema({
//    fieldname: String,
//    originalname: String,
//    name: String,
//    encoding: String,
//    mimetype: String,
//    path: String,
//    extension: String,
//    size: Number,
//    truncated: Boolean,
//    buffer: Buffer
//});
//
//var File = mongoose.model('File', FileSchema);

//var multer = require('multer');

var sendfile = function (res, path) {
    res.sendFile(path , { root : __dirname});
};
//
//app.use(multer({
//    dest: './uploads/',
//    rename: function (fieldname, filename) {
//        return filename + Date.now();
//    },
//    onFileUploadStart: function (file) {
//        console.log(file.originalname + ' is starting ...')
//    },
//    onFileUploadComplete: function (file) {
//        console.log(file.fieldname + ' uploaded to  ' + file.path);
//    },
//    onFileUploadData: function (file, data, req, res) {
//        res.write(JSON.stringify(file));
//    }
//}).single("files"));

//app.use(express.static(path.join(__dirname, "front")));


app.get('/', function (req, res) {
    sendfile(res, 'front/index.html');
});

var api = require("./modules/api")(app);

app.get(/^\/front\/.+$/, function (req, res) {
    sendfile(res, req.url.replace("/", ""));

});


app.listen(9001, function () {
    myWinston.info('Express server listening on port 9000');
});

//
//
//app.get('/api/templates/:name', function (req, res) {
//    sendfile(res, 'front/templates/'+req.params.name);
//});
//
//app.get('/api/templates', function (req, res) {
//    glob("front/templates/*", {}, function (er, files) {
//        res.send(files);
//    });
//});
//
//app.post('/upload', function (req, res) {
//    console.log(req.body); // form fields
//    console.log(req.files); // form files
//    res.status(200).end()
//});


var errors = require('./modules/errorsHandler')(app);