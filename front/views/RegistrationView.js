bm.RegistrationView = Backbone.View.extend({
    el: "#projects",

    template: _.template("<div>PROJECTS</div>"),

    render: function () {
        $(this.el).html(this.template());
    }
});


