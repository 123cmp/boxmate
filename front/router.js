define(['router', 'backbone', 'jquery'], function(router) {
return Backbone.Router.extend({
    routes: {
        "": "home",
        "!/": "home",
        "!/home": "home",
        "!/upload": "upload",
        "!/projects": "projects",
        "!/projects/:id": "project",
        "!/registration": "registration",
        "!/authorization": "authorization",
        "!/usertool": "usertool",
        "!/addnewproject": "addnewproject",
        "!/createnewproject": "createnewproject",
        "!/userprofile": "userprofile",
        "!/projectpage": "projectpage"

    },

    home: function () {

    },

    upload: function () {

    },

    projects: function () {

    },
    registration: function () {

    },

    authorization: function () {

    },

    usertool: function () {

    },

    addnewproject: function () {

    },
    createnewproject: function () {
        bm.stateModel.set({ state: "createnewproject" });
        bm.stateModel.trigger("change");
    },
    userprofile: function () {
        bm.stateModel.set({ state: "userprofile" });
        bm.stateModel.trigger("change");
    },
    project: function (id) {
        bm.stateModel.set({ state: "upload", routeParams: {id: id} });
        bm.stateModel.trigger("change");
    },
    projectpage: function () {
        bm.stateModel.set({ state: "projectpage" });
        bm.stateModel.trigger("change");
    }

});

bm.router = new bm.Router();