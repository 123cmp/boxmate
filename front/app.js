bm.loader = new bm.TemplateLoader(bm.TemplateStore);
bm.Views = {
    stateView: new bm.StateView({ model: bm.StateModel })
};
bm.stateModel.trigger("change");

var auth = false;

bm.Router = Backbone.Router.extend({
    routes: {
        "": "home",
        "!/": "home",
        "!/home": "home",
        "!/upload": "upload",
        "!/projects": "projects",
        "!/registration": "registration",
        "!/authorization": "authorization"

    },

    home: function () {
        bm.stateModel.set({ state: "home" });
        bm.stateModel.trigger("change");
    },

    upload: function () {
        bm.stateModel.set({ state: "upload" });
        bm.stateModel.trigger("change");
    },

    projects: function () {
        bm.stateModel.set({ state: "projects" });
        bm.stateModel.trigger("change");
    },

    registration: function () {
        bm.stateModel.set({ state: "registration" });
        bm.stateModel.trigger("change");
    },

    authorization: function () {
        bm.stateModel.set({ state: "authorization" });
        bm.stateModel.trigger("change");
    }
});

bm.router = new bm.Router();
Backbone.history.start();


