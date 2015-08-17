bm.StateModel = Backbone.Model.extend({
    defaults: {
        state: "home"
    }
});

bm.stateModel = new bm.StateModel();

