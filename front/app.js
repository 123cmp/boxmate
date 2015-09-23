/**
 * @module
 * @author 123cmp
 * @return {object} Main application object
 */
define(['router', 'backbone', 'jquery'], function(Router, bb) {
    'use strict';

    return new function() {
        var self = this;
        self.router = null;

        return {
            start: function() {
                self.router = new Router();
                bb.history.start();
            }
        }
    };

});

//
//
//
//bm.stateModel = new bm.StateModel();
//bm.Views = {
//    stateView: new bm.StateView({ model: bm.stateModel }),
//    menuView: new bm.MenuView({ model: bm.stateModel }),
//    spinnerView: new bm.SpinnerView({ model: bm.spinnerModel })
//};
//bm.stateModel.trigger("change");
//
//bm.Router = Backbone.Router.extend({
//    routes: {
//        "": "home",
//        "!/": "home",
//        "!/home": "home",
//        "!/upload": "upload",
//        "!/projects": "projects",
//        "!/projects/:id": "project",
//        "!/registration": "registration",
//        "!/authorization": "authorization",
//        "!/usertool": "usertool",
//        "!/addnewproject": "addnewproject",
//        "!/createnewproject": "createnewproject",
//        "!/userprofile": "userprofile",
//        "!/projectpage": "projectpage"
//
//    },
//
//    home: function () {
//        bm.stateModel.set({ state: "home" });
//        bm.stateModel.trigger("change");
//    },
//
//    upload: function () {
//        bm.stateModel.set({ state: "upload" });
//        bm.stateModel.trigger("change");
//    },
//
//    projects: function () {
//        bm.stateModel.set({ state: "projects" });
//        bm.stateModel.trigger("change");
//    },
//    registration: function () {
//        bm.stateModel.set({ state: "registration" });
//        bm.stateModel.trigger("change");
//    },
//
//    authorization: function () {
//        bm.stateModel.set({ state: "authorization" });
//        bm.stateModel.trigger("change");
//    },
//    usertool: function () {
//        bm.stateModel.set({ state: "usertool" });
//        bm.stateModel.trigger("change");
//    },
//    addnewproject: function () {
//        bm.stateModel.set({ state: "addnewproject" });
//        bm.stateModel.trigger("change");
//    },
//    createnewproject: function () {
//        bm.stateModel.set({ state: "createnewproject" });
//        bm.stateModel.trigger("change");
//    },
//    userprofile: function () {
//        bm.stateModel.set({ state: "userprofile" });
//        bm.stateModel.trigger("change");
//    },
//    project: function (id) {
//        bm.stateModel.set({ state: "upload", routeParams: {id: id} });
//        bm.stateModel.trigger("change");
//    },
//    projectpage: function () {
//        bm.stateModel.set({ state: "projectpage" });
//        bm.stateModel.trigger("change");
//    }
//
//});
//
//bm.router = new bm.Router();
//Backbone.history.start();
//

