/**
 * @module Api
 * @author 123cmp
 * @extends Backbone.Model
 * @description Model for user
 */
define(['jquery', 'underscore'],
    function ($, _) {
        return {

            /**
             * Пока не делаем
             * @returns {*}
             * @comment Пока не делаем
             * @description Get single user
             */
            getUser: function (id) {
                return $.get("api/users/" + id);
            },

            /**
             * @param user {string}
             * @returns {*}
             * @description Adds new user to system (register)
             * @comment Оставляем так
             */
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

            /**
             * @param id {string}
             * @returns {*}
             * @description Remove user
             * @comment Пока не делаем
             */
            removeUser: function (id) {
                return $.deleteJSON("api/users/id");
            },

            /**
             * @returns {*}
             * @description Get all projects of current user
             * @comment Waiting for
             * {
             *   my: [object] - Array of Project
             *   participate: [object] - Array of Project
             * }
             */
            getUserProjects: function () {
                return $.get("api/projects");
            },

            /**
             * @param id {string}
             * @returns {*}
             * @entity Project
             * @description Get single project
             * @comment Waiting for
             * {
             *   name: "Name" - String
             *   _id: "i13asd123i9ijkm3h7gh9" - String
             *   users: [object, object] - Array of User - {name, id}
             *   editors: [object, object] - Array of User - {name, id}
             *   moqups: [object, object] - Array of Moqup - {name, id}
             *   owner: object - User - {name - String}
             *   showed: true - Boolean
             *   aprooved: true - Boolean
             *   description: "" - String
             *   created: "2015/05/05T15:00" - String
             *   updated: "2015/05/05T16:00" - String
             * }
             */
            getProject: function (id) {
                return $.get("api/projects/" + id);
            },

            /**
             * @param id {string}
             * @param project {object}
             * @returns {*}
             * @description Update existed project
             * @entity Project
             * @comment Sending any of this
             * {
             *   name: "Name" - String
             *   _id: "i13asd123i9ijkm3h7gh9" - String
             *   users: [object, object] - Array of User - {name - String, position - String}
             *   moqups: [object, object] - Array of Moqup - {name - String, image - String}
             *   owner: object - User - {name - String, position - String}
             *   showed: true - Boolean
             *   aprooved: true - Boolean
             *   description: "" - String
             *   created: "2015/05/05T15:00" - String
             *   updated: "2015/05/05T16:00" - String
             * }
             */
            updateProject: function (id, project) {
                return $.ajax({
                    url: "api/projects/" + id,
                    type: "POST",
                    contentType: 'application/json',
                    dataType: "json",
                    data: JSON.stringify(project)
                });
            },

            /**
             * @param project {object}
             * @returns {*}
             * @description Adds new project
             * @comment Sends
             * {
             *   name: "Name" - String, required
             *   users: "Qwe@qwe.qwe" - String, not required, list of emails
             * }
             */
            addProject: function (project) {
                return $.ajax({
                    url: "api/projects/",
                    type: "PUT",
                    contentType: 'application/json',
                    dataType: "json",
                    data: JSON.stringify(project)
                });
            },

            /**
             * @param id {string}
             * @returns {*}
             * @description Remove single project
             */
            removeProject: function (id) {
                return $.deleteJSON("api/projects/" + id);
            },

            /**
             * @param id {string}
             * @returns {*}
             * @description Set showed prop of single project to false
             * @comment Sends
             * {
             *   showed: false - Boolean
             * }
             */
            hideProject: function (id) {
                return $.ajax({
                    url: "api/projects/",
                    type: "POST",
                    contentType: 'application/json',
                    dataType: "json",
                    data: JSON.stringify({showed: false})
                });
            },

            /**
             * @param id {string}
             * @returns {*}
             * @description Set showed prop of single project to true
             * @comment Sends
             * {
             *   showed: true - Boolean
             * }
             */
            showProject: function (id) {
                return $.ajax({
                    url: "api/projects/",
                    type: "POST",
                    contentType: 'application/json',
                    dataType: "json",
                    data: JSON.stringify({showed: true})
                });
            },

            /**
             * @param id {string}
             * @returns {*}
             * @description Set aprooved prop of single project to true
             * @comment Sends
             * {
             *   aprooved: true - Boolean
             * }
             */
            aprooveProject: function (id) {
                return $.ajax({
                    url: "api/projects/",
                    type: "POST",
                    contentType: 'application/json',
                    dataType: "json",
                    data: JSON.stringify({aprooved: true})
                });
            },

            /**
             * @param projectId {string}
             * @entity Moqup
             * @returns {*}
             * @description Get all moqups of project
             * @comment Waiting for
             * [
             *    {
             *        _id: "" - String
             *        created: "" - String date
             *        updated: "" - String date
             *        pins: [object] - Array of Pins
             *        owner: object - User (под вопросом)
             *    }
             * ]
             */
            getProjectMoqups: function (projectId) {
                return $.get("api/projects/" + projectId + "/moqups");
            },

            /**
             * @param id {string}
             * @entity Moqup
             * @returns {*}
             * @description Get single moqup
             * @comment Waiting for
             * {
             *    _id: "" - String
             *    created: "" - String date
             *    updated: "" - String date
             *    pins: [object] - Array of Pins
             *    owner: object - User (под вопросом)
             * }
             *  Картинку я рассчитываю получать как /api/images/id, где id это id из мокапа
             */
            getMockup: function (id) {
                return $.get("api/moqups/" + id);
            },

            /**
             * @param image {FormData}
             * @param id {string}
             * @returns {*}
             * @description Uploads new image and create according moqup
             * @comment Sends image multi-part data of image
             */
            addMoqup: function (image, id) {
                return $.ajax({
                    url: "api/projects/" + id + "/moqups/",
                    type: "PUT",
                    contentType: false,
                    processData: false,
                    data: image
                });
            },

            /**
             * @param id {string}
             * @returns {*}
             * @description Removes single moqup
             */
            removeMoqup: function (id) {
                return $.deleteJSON("api/moqups/" + id);
            },

            /**
             * @param id {string}
             * @entity Task
             * @returns {*}
             * @description Get moqup's list of tasks
             * @comment Waiting for
             * [
             *   {
             *     _id: "" - String
             *     created: "" - String date
             *     owner: object - User
             *     status: Enum (todo(0), inprogress(1), resolved(2))
             *     coordinates: {x: 0, y: 0} - Object
             *     type: Enum (pin(0), square(1));
             *     description: String
             *   }
             * ]
             */
            getMoqupsTasks: function (id) {
                return $.get("api/moqups/" + id + "/tasks");
            },

            /**
             * @param id {string}
             * @param moqId {string}
             * @entity Task
             * @returns {*}
             * @description Get single task
             * @comment
             * Пока не нужно
             * Waiting for
             * {
             *   _id: "" - String
             *   created: "" - String date
             *   owner: object - User
             *   status: Enum (todo(0), inprogress(1), resolved(2))
             *   coordinates: {x: 0, y: 0} - Object
             *   type: Enum (pin(0), square(1));
             *   description: String
             * }
             */
            getTask: function (moqId, id) {
                return $.get("api/moquaps/"+moqId+"/tasks/" + id);
            },

            /**
             * @param task {object}
             * @param moqId {string}
             * @returns {*}
             * @description Add task to moqup
             * @comment Sending
             * {
             *   coordinates: {x: 0, y: 0} - Object
             *   type: Enum (pin(0), square(1));
             *   description: String
             * }
             */
            addTask: function (moqId, task) {
                return $.putJSON("api/moquaps/"+moqId+"/tasks/", task);
            },

            /**
             * @param id {string}
             * @param moqId {string}
             * @returns {*}
             * @description Remove task
             */
            removeTask: function (moqId, id) {
                return $.deleteJSON("api/moquaps/"+moqId+"/tasks/" + id);
            },

            /**
             * @param model {object}
             * @returns {*}
             * @description Auth method
             * @comment Оставляем как есть
             */
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



