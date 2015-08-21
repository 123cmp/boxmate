bm.AuthFormView = Backbone.View.extend({
    el: "#authorization-form",

    templateName: "AuthorizationFormTemplate.html",
    template: null,
    events: {
        "submit form": "formSubmitted"
    },
    initialize: function() {
        if(!this.model) this.model = new bm.UserModel();
    },
    formSubmitted: function(e){
        e.preventDefault();
        var data = Backbone.Syphon.serialize(this);
        this.model.set(data);
        if(this.model.get("password")) {

        }
        //this.model.save();

    },

    render: function () {
        var __self = this;
        if(__self.template) {
            $(this.el).html(this.template());
        } else {
            $.when(bm.TemplateStore.get(__self.templateName)).then(function(template) {
                if(template) {
                    __self.template = _.template(template);
                    __self.render();
                }
            });
        }
    }
});


