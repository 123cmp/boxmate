/**
 * @module
 * @author 123cmp
 * @extends Backbone.Model
 * @description Model for create new project
 */
define(['abstract/ValidationFormModel', 'components/main/models/ErrorsCollection', 'text!validation/create-project.validate.json'],
    function(ValidationFormModel, ErrorsCollection, validationRules) {

        return ValidationFormModel.extend({
            defaults: {
                name: {
                    title: "Название:",
                    value: "",
                    type: 'text',
                    name: "name",
                    placeholder: "My project",
                    errors: new ErrorsCollection()
                },
                users: {
                    title: "Добавить пользователей",
                    value: "",
                    type: 'text',
                    name: "users",
                    placeholder: "example@gmail.com, ...",
                    errors: new ErrorsCollection()
                },
                valid: false
            },

            validationRules: validationRules,

            save: function() {
                var project = {};
                $.each(this.toJSON(), function(i, field) {
                    if(field instanceof Object) project[i] = field.value;
                });
                api.addProject(project);
            }
        })
    });



