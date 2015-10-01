/**
 * @module
 * @author 123cmp
 * @extends Backbone.Model
 * @description Model for registration form
 */
define(['abstract/ValidateModel'],
    function(ValidateModel) {
        return ValidateModel.extend({

            clearErrors: function() {
                var self = this;
                self.each(function(field) {
                    var fieldObject = _.clone(self.get(field));
                    if(fieldObject.errors) fieldObject.errors.reset();
                    self.set(field, fieldObject);
                });
            },

            clearFieldErrors: function(name) {
                var fieldObject = _.clone(this.get(name));
                if(fieldObject.errors) fieldObject.errors.reset();
                this.set(name, fieldObject);
            },

            addError: function(field, message) {
                var fieldObject = _.clone(this.get(field));
                fieldObject.errors.add({field: field, message: message});
                this.set(field, fieldObject);
            },

            validate: function() {
                var self = this;
                self.set('valid', true);
                self.clearErrors();
                var result = this.valid(this.validationRules);
                if(!result.valid) {
                    self.set('valid', false);
                    $.each(result, function(i, field) {
                        if(typeof field == 'object') {
                            $.each(field, function(j, message) {
                                self.addError(i, message.message);
                            });
                        }
                    });
                }
            },

            validateField: function(name) {
                var self = this;
                self.clearFieldErrors(name);
                var rules = JSON.parse(this.validationRules);
                var result = this.validField(name, rules[name]);
                if(result.length > 0) self.addError(name, result[0].message)
            },

            setFields: function(fields) {
                var self = this;
                $.each(fields, function(i, field) {
                    self.setField(i, field);
                });
            },

            setField: function(name, value) {
                console.log(name);
                var modelField = this.get(name);
                modelField.value = value;
                this.set(name, modelField);
            }


        })
    });




