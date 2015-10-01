/**
 * @module Router
 * @author 123cmp
 * @return {object} Router object
 * @extends Backbone.Router
 * @description Routing module
 * */
define(['jquery', 'backbone'], function($, bb) {

    /**
     * @private
     * @description List of page views
     * */
    var views = {
        home: "routeViews/HomeRouteView",
        upload: "routeViews/UploadRouteView",
        projects: "routeViews/ProjectsRouteView",
        registration: "routeViews/RegistrationRouteView",
        authorization: "routeViews/AuthorizationRouteView",
        usertool: "routeViews/UserToolRouteView",
        profile: "routeViews/ProfileRouteView",
        createnewproject: "routeViews/CreateNewProjectRouteView",
        userprofile: "routeViews/UserProfileRouteView",
        projectpage: "routeViews/ProjectPageRouteView"
    };

    /**
     * @private
     * @method
     * @description Load page view
     * */
    var loadView = function(viewName, options) {
        console.log(viewName);
        require([views[viewName]], function(RouteView) {
            new RouteView(options).run()
        });
    };

    return bb.Router.extend({
        routes: {
            "": "home",
            "!/": "home",
            "!/home": "home",
            "!/upload": "upload",
            "!/projects": "projects",
            //"!/projects": "project",
            "!/registration": "registration",
            "!/authorization": "authorization",
            "!/usertool": "usertool",
            "!/profile": "profile",
            //"!/addnewproject": "addnewproject",
            "!/createnewproject": "createnewproject",
            "!/userprofile": "userprofile",
            "!/projects/:id": "projectpage"
        },

        home: function () {
            loadView("home");
        },

        upload: function () {
            loadView("upload");
        },

        projects: function () {
            loadView("projects");
        },

        registration: function () {
            loadView("registration");
        },

        authorization: function () {
            loadView("authorization");
        },

        usertool: function () {
            loadView("usertool");
        },

        profile: function () {
            loadView("profile");
        },

        createnewproject: function () {
            loadView("createnewproject");
        },

        userprofile: function () {
            loadView("userprofile");
        },

        //project: function (id) {
        //    loadView("project");
        //},

        projectpage: function (id) {
            loadView("projectpage", {id: id});
        }

    });
});
