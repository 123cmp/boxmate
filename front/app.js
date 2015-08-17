bm.Views = {
    stateView: new bm.StateView({ model: bm.StateModel })
};
bm.stateModel.trigger("change");

bm.Router = Backbone.Router.extend({
    routes: {
        "": "home",
        "!/": "home",
        "!/home": "home",
        "!/upload": "upload",
        "!/projects": "projects"
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
    }
});

bm.router = new bm.Router();
Backbone.history.start();


