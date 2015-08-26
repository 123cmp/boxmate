bm.RegistrationView = Backbone.View.extend({
    el: "#registrationForm",

    events: {
        "submit form": "formSubmitted"
    },

    validation: {
        "name": {
            "required":  {"value" : "true", "message": "Укажите имя"},
            "maxLength": {"value" : "25", "message": "Имя слишком длинное"},
            "minLength": {"value" : "2", "message": "Имя слишком короткое"}
        },
        "email": {
            "required":  {"value" : "true", "message": "Укажите email"},
            "maxLength": {"value" : "25", "message": "Email слишком длинный"},
            "minLength": {"value" : "4", "message": "Email слишком короткий"},
            "isEmail" :  {"value" : "true", "message": "Email не валидный"}
        },
        "password": {
            "required":  {"value" : "true", "message": "Укажите пароль"},
            "maxLength": {"value" : "25", "message": "Пароль слишком длинный"},
            "minLength": {"value" : "6", "message": "Пароль слишком короткий"},
            "equals" :   {"value" : "repeat"}
        },
        "repeat": {
            "required":  {"value" : "true", "message": "Поле не заполнено"},
            "equals" :   {"value" : "password", "message": "Пароль не совпадает с подтверждением"}
        }
    },

    templateName: "RegistrationFormTemplate.html",
    template: null,

    initialize: function() {
        if(!this.model) this.model = new bm.UserModel();
    },

    formSubmitted: function(e){
        var __self = this;
        e.preventDefault();
        var data = Backbone.Syphon.serialize(__self);
        __self.model.set(data);
        var validationResult = __self.model.valid(__self.validation);
        if(validationResult.result) bm.ApiService.addUser(__self.model.toJSON());
        else {
            $.each(validationResult.full, function(i, field) {
                if(!field.result) {
                    $.each(field.rules, function(name, rule) {
                        console.log(name, rule);
                        if(!rule.valid) {
                            __self.addError(i, rule.message);
                            return false;
                        }
                    });
                }
            });
        }
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


