var Token = require("../models/tokenModel");

module.exports.consumeRememberMeToken = function (token, func) {

    Token.findOne({"token": token}, function (err, tokenObj) {
        console.log(tokenObj);
        if(tokenObj) {
            tokenObj.remove();
            return func(null, tokenObj.userId);
        }
        return func(null, null);
    });
    // invalidate the single-use token
};

module.exports.issueToken = function (user, done) {
    console.log(user);
    var token = randomString(64);
    var tokenObj = new Token({token: token, userId: user._id});
    tokenObj.save(function (err) {
        if (err) {
            return done(err);
        }
        return done(null, token);
    });
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