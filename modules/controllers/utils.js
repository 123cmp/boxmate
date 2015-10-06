var fs = require('fs'),
    Q = require("q"),
    log = require("../myWinston")(module),
    validator = require("../utils/Validator"),
    validationFilesPath = "/home/maxim/Projects/boxmate/",
    validationFilePrefix = ".validate.json",
    conditions;

module.exports.validate = function (body, name) {
    return Q.nfcall(fs.readFile, validationFilesPath + name + validationFilePrefix).then(function (data) {
        try{
            conditions = (JSON.parse(data));
        } catch(err){
            console.log(err);
            return false;
        }

        for (value in body) {
            if (conditions[value]) {
                if(conditions[value].equals){
                    var result = validator.Validator(body[value], body[conditions[value].equals.value], conditions[value]);
                } else {

                    var result = validator.Validator(body[value], null, conditions[value]);
                }
                if (!result.status) {
                    log.info("send false 1");
                    return false;
                }
            }
        }
        log.info("send true");
        return true;
    }, function (err) {
        return false;
    });
};

exports.randomString = function (len) {
    var buf = []
        , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        , charlen = chars.length;

    for (var i = 0; i < len; ++i) {
        buf.push(chars[getRandomInt(0, charlen - 1)]);
    }

    return buf.join('');
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
