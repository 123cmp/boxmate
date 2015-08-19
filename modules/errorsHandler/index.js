var log = require("../myWinston")(module);
module.exports = function(app) {
    app.use(function(req, res){
        res.status(404);
        log.debug('Not found URL: %s',req.url);
        res.send({ error: 'Not found' });
        return false;
    });

    app.use(function(err, req, res, next){
        res.status(err.status || 500);
        log.error('Internal error(%d): %s',res.statusCode,err.message);
        res.send({ error: err.message });
        return false;
    });

    return this;
};
