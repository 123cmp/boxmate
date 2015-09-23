/**
 * @module Api
 * @author 123cmp
 * @extends Backbone.Model
 * @description Model for user
 */
define(['../../../bower_components/jquery/dist/jquery.min', 'underscore'],
    function ($, _) {
        return {
            getTemplates: function () {
                return $.get("api/templates/")
            },
            getTemplate: function (name) {
                return $.get("api/templates/" + name)
            },
            getUsers: function () {
                return $.get("api/users/");
            },
            getUser: function (id) {
                return $.get("api/users/" + id);
            },
            addUser: function (user) {
                if(!_.isUndefined(user.id)) delete user.id;
                return $.ajax({
                    url: "api/users/",
                    type: "PUT",
                    contentType: 'application/json',
                    dataType: "json",
                    data: JSON.stringify(user)
                });

            },
            removeUser: function (id) {
                return $.deleteJSON("api/users/id");
            },
            getUserProjects: function () {
                return $.get("api/projects");
            },
            getProject: function (id) {
                return $.get("api/projects/" + id);
            },
            addProject: function (project) {
                return $.ajax({
                    url: "api/projects/",
                    type: "PUT",
                    contentType: 'application/json',
                    dataType: "json",
                    data: JSON.stringify(project)
                });
            },
            removeProject: function (id) {
                return $.deleteJSON("api/projects/" + id);
            },
            getProjectImages: function (projectId) {
                return $.get("api/projects/" + projectId + "/images");
            },
            getImage: function (id) {
                return $.get("api/images/" + id);
            },
            addImage: function (image, id) {
                return $.ajax({
                    url: "api/projects/" + id + "/images/",
                    type: "PUT",
                    contentType: false,
                    processData: false,
                    data: image
                });
            },
            removeImage: function (id) {
                return $.deleteJSON("api/images/" + id);
            },
            getImageTasks: function (imageId) {
                return $.get("api/images/" + imageId + "/tasks");
            },
            getTask: function (id) {
                return $.get("api/tasks/" + id);
            },
            addTask: function (task) {
                return $.putJSON("api/tasks/", task);
            },
            removeTask: function (id) {
                return $.deleteJSON("api/tasks/" + id);
            },
            getValidation: function (key) {
                return $.get("api/validations/" + key);
            },
            authorize: function (model) {
                return $.ajax({
                    url: "api/login/",
                    type: "POST",
                    contentType: 'application/json',
                    dataType: "json",
                    data: JSON.stringify(model)
                });
            }
        }
    });



