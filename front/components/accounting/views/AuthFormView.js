define(['jquery', 'abstract/ValidationFormView', 'text!components/accounting/templates/AuthorizationFormTemplate.html'],
    function($, ValidationFormView, template) {
        return new function() {
            return ValidationFormView.extend({
                events: {
                    "click .button-authorization" : "done",
                    "blur form input": "validateField"
                },

                templateHtml: template,

                onValid: function() {
                    this.model.save();
                }
            });
        };
    });