bm.CreateProjectView = Backbone.View.extend({
    el: ".create-form",

    events: {
        "submit": "formSubmitted"
    },

    validation: {
        "name": {
            "required":  {"value" : "true", "message": "Укажите название"},
            "maxLength": {"value" : "25", "message": "Название слишком длинное"},
            "minLength": {"value" : "2", "message": "Название слишком короткое"}
        },
        "users": {
            "maxLength": {"value" : "325", "message": "Поле переполнено"},
            "minLength": {"value" : "4", "message": "Email слишком короткий"}
        }
    },


    initialize: function() {
        if(!this.model) this.model = new bm.ProjectModel();
    },

    formSubmitted: function(e){
        var __self = this;
        e.preventDefault();
        var data = Backbone.Syphon.serialize(__self);
        __self.model.set(data);
        $(__self.el).find('.error-message').remove();
        $(__self.el).find('.error').removeClass('error');
        var validationResult = __self.model.valid(__self.validation);
        __self.model.unset("id");
        var users = __self.model.get("users").split(",");
        $.each(users, function(i,v) { users[i] = $.trim(v)});
        __self.model.set("users", users);
        if(validationResult.result) bm.ApiService.addProject(__self.model.toJSON());
        else {
            $.each(validationResult.full, function(i, field) {
                if(!field.result) {
                    $.each(field.rules, function(name, rule) {
                        if(!rule.valid) {
                            __self.addError(i, rule.message);
                            return false;
                        }
                    });
                }
            });
        }
        return false;
    },

    addError: function(fieldName, message) {
        var field = $(this.el).find('[name='+fieldName+']');
        field.addClass("error");
        var messageField = $("<div></div>")
            .addClass("error-message")
            .text(message)
            .insertAfter(field)
    },

    render: function () {

    }


});


