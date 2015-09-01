//var Token = require("../models/tokenModel");

//module.exports.consumeRememberMeToken = function (token, func) {
//
//    Token.findOne({"token": token}, function (err, tokenObj) {
//        if (tokenObj) {
//            var uid = tokenObj.userId;
//            return func(null, uid);
//        } else {
//            return func(null, false);
//        }
//    });
//};

module.exports.issueToken = function () {
    console.log("creating new token");
    var token = randomString(64);
    return token;
};


function randomString(len) {
    var buf = []
        , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        , charlen = chars.length;
    for (var i = 0; i < len; ++i) {
        buf.push(chars[getRandomInt(0, charlen - 1)]);
    }
    return buf.join('');
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}