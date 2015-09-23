bm.MenuView = Backbone.View.extend({
    el: "#menu",

    initialize: function () {
        var __self = this;
        var state = null;
        __self.model.bind("change:state", function () {
            state = bm.stateModel.get("state");
            __self.render(state);
        });
        __self.render();
    },

    render: function (state) {
        console.log("MENU", state);
        var links = $(this.el).find("[href]");
        $.each(links, function(i,v) {
            var parent = $(v).parent();
            if( $(v).attr("href").indexOf(state) > -1){
                if(!parent.hasClass("active")) parent.addClass("active");
            } else {
                if(parent.hasClass("active")) parent.removeClass("active");
            }
        });
    }
});


