bm.ProjectView = Backbone.View.extend({
    parent: ".bm-projects-container",
    el: null,
    templateName: "ProjectTemplate.html",
    template: null,

    initialize: function() {

    },

    render: function () {
        var __self = this;
        if (__self.template) {
            __self.el = $(__self.template());
            $(parent).append(__self.el);
        } else {
            $.when(bm.TemplateStore.get(__self.templateName)).then(function (template) {
                if (template) {
                    __self.template = _.template(template);
                    __self.render();
                }
            });
        }
    }
});


