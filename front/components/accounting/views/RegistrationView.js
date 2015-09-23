define(['../../../bower_components/jquery/dist/jquery.min', 'abstract/ValidationFormView', 'text!templates/RegistrationFormTemplate.html'],
    function($, ValidationFormView, template) {
        return new function() {
            return ValidationFormView.extend({
                events: {
                    "click .button-registration" : "done",
                    "blur .registration-form input": "validateField"
                },

                templateHtml: template,

                onValid: function() {
                    this.model.saveAsUser();
                }
            });
        };
    });