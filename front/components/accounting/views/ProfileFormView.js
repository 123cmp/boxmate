define(['jquery', 'abstract/ValidationFormView', 'text!components/accounting/templates/ProfileFormTemplate.html'],
    function($, ValidationFormView, template) {
        return new function() {
            return ValidationFormView.extend({
                events: {
                    "focusout .create-form-input": "validateField"
                    //"click .bm-create-project" : "done"
                },

                templateHtml: template,

                onValid: function() {
                    //this.model.save();
                    //console.log("save");
                }
            });
        };
    });
