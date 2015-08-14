var express = require("express");
var mongoose = require("mongoose");
mongoose.connect('mongodb://mate:qweasd@localhost:27017/boxmate');
var app=express();

var FileSchema = new mongoose.Schema({
    fieldname: String,
    originalname: String,
    name: String,
    encoding: String,
    mimetype: String,
    path: String,
    extension: String,
    size: Number,
    truncated: Boolean,
    buffer: Buffer
});

var File = mongoose.model('File', FileSchema);


var multer  = require('multer');

app.use(multer({ dest: './uploads/',
    rename: function (fieldname, filename) {
        return filename+Date.now();
    },
    onFileUploadStart: function (file) {
        console.log(file.originalname + ' is starting ...')
    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path);
        /*var mgFile = new File(file);
        mgFile.save();*/
    },
    onFileUploadData: function (file, data, req, res) {
        res.write(JSON.stringify(file));
    }
}));

app.get('/',function(req,res){
    res.sendfile("front/index.html");
});

app.listen(9000,function(){
});


app.get(/^\/front\/.+$/, function(req, res) {
    res.sendfile(req.url.replace("/", ""));
});

app.post('/upload',function(req,res){
    console.log(req.body); // form fields
    console.log(req.files); // form files
    res.status(200).end()
});


