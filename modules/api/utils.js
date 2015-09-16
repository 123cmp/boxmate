var fs = require('fs'),
    log = require("../myWinston")(module),
    validationFilesPath = "/home/maxim/Projects/boxmate/",
    validationFilePrefix = ".validate.json",
    Q = require("q"),
    validator = require("../utils/Validator"),
    conditions;

module.exports.validate = function (body, name) {
    return Q.nfcall(fs.readFile, validationFilesPath + name + validationFilePrefix).then(function (data) {
        conditions = (JSON.parse(data));
        for (value in body) {
            if (conditions[value]) {
                if(conditions[value].equals){
                    var result = validator(body[value], body[conditions[value].equals.value], conditions[value]);
                } else {
                    var result = validator(body[value], null, conditions[value]);
                }
                if (!result.status) {
                    console.log(result);
                    log.info("send false 1");
                    return false;
                }
            }
        }
        log.info("send true");
        return true;
    }, function (err) {
        console.log(err);
        log.info("send false 2");
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
