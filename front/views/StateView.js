bm.StateView = Backbone.View.extend({
    el: $("#view"),

    templates:  {
        "home": _.template("<ul class='large-block-grid-3'><li></li><li class='text-center'><h1 id='hello'></h1></li><li></li></ul>"),
        "upload": _.template("<div id='upload-field'></div>"),
        "projects": _.template("<div id='projects'></div>")
    },

    views: {
        "home": ['HomeView'],
        "upload": ['UploadFieldView'],
        "projects": ['ProjectsView']
    },

    initialize: function () {
        var __self = this;
        bm.stateModel.bind("change:state", function () {
            __self.render();
        });
        __self.render();
    },

    events: {},

    render: function () {
        var state = bm.stateModel.get("state");
        $(this.el).html(this.templates[state](bm.stateModel.toJSON()));
        $.each(this.views[state], function(i, v) {
            console.log(bm, bm[v]);
            if(!bm[v]) console.error("Ошибка при инжекте вьюхи (проверь index.html)");
            else new bm[v]().render();
        });
        return this;
    }
});


