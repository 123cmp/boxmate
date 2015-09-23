bm.HomeView = Backbone.View.extend({
    el: "#hello",

    template: _.template("<div>Hello, cruel world ;)</div>"),

    render: function () {
        $(this.el).html(this.template());
    }
});


