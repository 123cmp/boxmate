/**
 * @module
 * @author 123cmp
 * @extends Backbone.Model
 * @description Model for registration form
 */
define(['abstract/ValidationFormModel', 'components/main/models/ErrorsCollection', 'text!validation/registration.validate.json', 'components/accounting/models/UserModel'],
    function(ValidationFormModel, ErrorsCollection, validationRules, UserModel) {

        return ValidationFormModel.extend({
            defaults: {
                name: {
                    title: "Имя:",
                    value: "",
                    type: 'text',
                    name: "name",
                    placeholder: "Martin Garrix",
                    errors: new ErrorsCollection()
                },
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
                repeat: {
                    title: "Повторить пароль:",
                    value: "",
                    type: 'password',
                    name: "repeat",
                    placeholder: "",
                    errors: new ErrorsCollection()
                },
                subscribe: {
                    title: "Подписка на новости:",
                    value: "",
                    type: 'checkbox',
                    name: "subscribe",
                    placeholder: "",
                    errors: new ErrorsCollection()
                },
                valid: false
            },

            validationRules: validationRules,

            saveAsUser: function() {

                var user = {};
                $.each(this.toJSON(), function(i, field) {
                    user[i] = field.value;
                });
                var userModel = new UserModel(user);
                userModel.save();
            }
        })
    });




