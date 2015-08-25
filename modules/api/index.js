var path = require('path');
var dataBase = require("../dataBase");
var bodyParser = require('body-parser');
var log = require("../myWinston")(module);

var sendfile = function (res, file) {
    res.sendFile(path.resolve(__dirname+'/../../front'+ file));
};

module.exports = function(app) {

   app.use(bodyParser.json());

   app.get("/api/templates/", function(req, res) {

   });
   app.get("/api/templates/:name", function(req, res) {
       sendfile(res, "/templates/"+req.params.name);
   });
   app.get("/api/users/", function(req, res) {

   });
   app.get("/api/users/:id", function(req, res) {

   });
   app.put("/api/users/", function(req, res) {

      dataBase.UsersModel.find({mail: req.body.mail}, function(err, article){
         if(article.length < 1){

            var user = new dataBase.UsersModel({
               name: req.body.name,
               mail: req.body.mail,
               pwd: req.body.pwd
            });

            user.save(function (err) {
               if (!err) {
                  log.info("user created");
                  return res.send({ status: 'OK'});
               } else {
                  console.log(err);
                  if(err.name == 'ValidationError') {
                     res.statusCode = 400;
                     res.send({ error: 'Validation error' });
                  } else {
                     res.statusCode = 500;
                     res.send({ error: 'Server error' });
                  }
                  log.error('Internal error(%d): %s',res.statusCode,err.message);
               }
            });

         } else {

            res.statusCode = 400;
            res.send({ error: 'Email is not available'});

         }
      });

   });
   app.post("/api/users/", function(req, res) {

   });
   app.delete("/api/users/:id", function(req, res) {

   });
   app.get("/api/users/:userId/projects/", function(req, res) {

   });
   app.get("/api/projects/:id", function(req, res) {

   });
   app.put("/api/projects/", function(req, res) {

   });
   app.post("/api/projects/", function(req, res) {

   });
   app.delete("/api/projects/:id", function(req, res) {

   });
   app.get("/api/projects/:projectId/images", function(req, res) {

   });
   app.get("/api/images/:id", function(req, res) {

   });
   app.put("/api/images/", function(req, res) {

   });
   app.post("/api/images/", function(req, res) {

   });
   app.delete("/api/images/:id", function(req, res) {

   });
   app.get("/api/images/:imageId/tasks", function(req, res) {

   });
   app.get("/api/tasks/:id", function(req, res) {

   });
   app.put("/api/tasks/", function(req, res) {

   });
   app.post("/api/tasks/", function(req, res) {

   });
   app.delete("/api/tasks/:id", function(req, res) {

   });

   return this;
};
