/**
 * @module
 * @author 123cmp
 * @extends Backbone.Model
 * @description Model for auth page
 */
define(['abstract/ValidationFormModel', 'components/main/models/ErrorsCollection', 'text!validation/registration.validate.json'],
    function(ValidationFormModel, ErrorsCollection, validationRules) {
        return ValidationFormModel.extend({
            defaults: {
                email: {
                    title: "Ваш email:",
                    value: "",
                    type: 'email',
                    name: "email",
                    placeholder: "example@gmail.com",
                    errors: new ErrorsCollection()
                },
                password: {
                    title: "Пароль:",
                    value: "",
                    type: 'password',
                    name: "password",
                    placeholder: "",
                    errors: new ErrorsCollection()
                },
                remember_me: {
                    title: "Запомнить меня:",
                    value: "",
                    type: 'checkbox',
                    name: "remember_me",
                    placeholder: "",
                    errors: new ErrorsCollection()
                },
                valid: false
            },

            save: function() {
                 return api.authorize(this.toJSON())
            },

            validationRules: validationRules

        })
    });