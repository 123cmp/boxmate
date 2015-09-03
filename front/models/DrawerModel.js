bm.DrawerModel = Backbone.Model.extend({
    defaults: {
        color: "#FF0000",
        refreshTimer: function() {},
        initTimer: function() {},
        timer: function() {},
        save: function() {},
        draw: function() {},
        context: null
    }
});
