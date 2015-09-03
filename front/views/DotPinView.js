bm.DotPinView = Backbone.View.extend({
    el: null,

    addComment: function() {
        console.log("textarea into div");
    },

    addListeners: function() {
        $(this.el).find(".button-click")
    },

    initialize: function () {
        this.el = $(this.model.get("el"));
        this.addListeners();
    }

});


