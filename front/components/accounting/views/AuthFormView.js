define(['jquery', 'abstract/ValidationFormView', 'text!components/accounting/templates/AuthorizationFormTemplate.html'],
    function($, ValidationFormView, template) {
        return new function() {
            return ValidationFormView.extend({
                events: {
                    "click .bm-auth" : "done",
                    "blur input": "validateField"
                },

                templateHtml: template,

                onValid: function() {
                    this.model.save();
                }
            });
        };
    });