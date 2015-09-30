define(['text!components/projects/templates/ActiveProjectsTemplate.html'],
    function() {
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