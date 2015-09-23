define(['../../../bower_components/jquery/dist/jquery.min', 'abstract/ValidationFormView', 'text!templates/CreateNewProjectFormTemplate.html'],
    function($, ValidationFormView, template) {
        return new function() {
            return ValidationFormView.extend({
                events: {
                    "blur form input": "validateField",
                    "submit form" : "done"
                },

                templateHtml: template,

                onValid: function() {
                    this.model.save();
                }
            });
        };
    });
