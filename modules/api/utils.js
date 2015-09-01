var fs = require('fs'),
    validationFilesPath = "/home/maxim/Projects/boxmate/",
    validationFilePrefix = ".validate.json",
    conditions;

module.exports.validate = function(body, name){
    fs.readFile(validationFilesPath + name + validationFilePrefix,function (err,data) {
        if (err) {
            return console.log(err);
        }
        console.log(JSON.parse(data));
        conditions = (JSON.parse(data));
    });
};