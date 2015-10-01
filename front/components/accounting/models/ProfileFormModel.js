/**
 * @module
 * @author 123cmp
 * @extends Backbone.Model
 * @description Model for profile form on profile page
 */
define(['abstract/ValidationFormModel', 'components/main/models/ErrorsCollection', 'text!validation/profile.validate.json'],
    function(ValidationFormModel, ErrorsCollection, validationRules) {
        return ValidationFormModel.extend({
            defaults: {
                name: {
                    title: "Имя:",
                    value: "",
                    type: 'text',
                    name: "name",
                    placeholder: "Введите имя",
                    errors: new ErrorsCollection()
                },
                second: {
                    title: "Фамилия:",
                    value: "",
                    type: "text",
                    name: "second",
                    placeholder: "Введите фамилию",
                    errors: new ErrorsCollection()
                },
                email: {
                    title: "Email:",
                    value: "",
                    type: 'email',
                    name: "email",
                    placeholder: "example@gmail.com",
                    errors: new ErrorsCollection()
                },
                valid: false
            },

            save: function() {
                 //return api.authorize(this.toJSON())
            },

            validationRules: validationRules

        })
    });