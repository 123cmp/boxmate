/**
 * @module
 * @author 123cmp
 * @extends Backbone.Model
 * @description Model for auth page
 */
define(['abstract/ValidationFormModel', 'components/main/models/ErrorsCollection', 'text!validation/authorization.validate.json', 'api', 'jquery'],
    function(ValidationFormModel, ErrorsCollection, validationRules, api, $) {
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
                //remember_me: {
                //    title: "Запомнить меня:",
                //    value: "",
                //    type: 'checkbox',
                //    name: "remember_me",
                //    placeholder: "",
                //    errors: new ErrorsCollection()
                //},
                valid: false
            },

            save: function() {
                var self = this;
                var requestBody = {};
                $.each(this.toJSON(), function(i, field) {
                   if(field instanceof Object) requestBody[field.name] = field.value;
                });
                var promise = api.authorize(requestBody);
                promise.fail(function(error) {
                    if(error.status == 401) self.addError('email', 'Неправильный email или пароль');
                    self.trigger('error');
                });
                return promise
            },

            validationRules: validationRules

        })
    });