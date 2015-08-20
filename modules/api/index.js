var path = require('path');

var sendfile = function (res, file) {
    res.sendFile(path.resolve(__dirname+'/../../front'+ file));
};

module.exports = function(app) {
   app.get("api/templates/", function(req, res) {

   });
   app.get("/api/templates/:name", function(req, res) {
       console.log('/front/templates/'+req.params.name);
       sendfile(res, "/templates/"+req.params.name);
   });
   app.get("api/users/", function(req, res) {

   });
   app.get("api/users/:id", function(req, res) {

   });
   app.put("api/users/", function(req, res) {

   });
   app.post("api/users/", function(req, res) {

   });
   app.delete("api/users/id", function(req, res) {

   });
   app.get("api/users/:userId/projects/", function(req, res) {

   });
   app.get("api/projects/:id", function(req, res) {

   });
   app.put("api/projects/", function(req, res) {

   });
   app.post("api/projects/", function(req, res) {

   });
   app.delete("api/projects/:id", function(req, res) {

   });
   app.get("api/projects/:projectId/images", function(req, res) {

   });
   app.get("api/images/:id", function(req, res) {

   });
   app.put("api/images/", function(req, res) {

   });
   app.post("api/images/", function(req, res) {

   });
   app.delete("api/images/:id", function(req, res) {

   });
   app.get("api/images/:imageId/tasks", function(req, res) {

   });
   app.get("api/tasks/:id", function(req, res) {

   });
   app.put("api/tasks/", function(req, res) {

   });
   app.post("api/tasks/", function(req, res) {

   });
   app.delete("api/tasks/:id", function(req, res) {

   });

   return this;
};
