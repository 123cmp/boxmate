bm.AuthorizationView = Backbone.View.extend({
    el: "#auth",

    template: _.template("<div>Hello, cruel world ;)</div>"),

    render: function () {
        $(this.el).html(this.template());
    }
});


