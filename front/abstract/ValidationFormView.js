define(['jquery', 'backbone', 'underscore', 'syphon'],
    function($, bb, _, syphon) {
        return new function() {
            return bb.View.extend({
                 done: function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.model.setFields(syphon.serialize(this.$el));
                    this.model.validate();
                    if(this.model.get('valid')) {
                        if(this.onValid) this.onValid();
                    }
                    this.render();
                    return false;
                },

                validateField: function(e) {
                    var input = null;
                    if(e.relatedTarget) {
                        if(e.relatedTarget.nodeName == "BUTTON") return;
                        else if(e.relatedTarget.nodeName == "INPUT") {
                            input = $(e.relatedTarget).attr("name");
                        }
                    }
                    var value = $(e.target).attr('type') == 'checkbox' ? $(e.target).is(':checked') : $(e.target).val();
                    this.model.setField($(e.target).attr('name'), value);
                    this.model.validateField($(e.target).attr('name'));
                    this.render();
                    if(input) $("input[name="+input+"]").focus();



                    return true;
                },

                initialize: function () {
                    var self = this;
                    this.template = _.template(this.templateHtml);
                    this.render();
                    this.model.on("error", function() {
                        self.render();
                        console.log("ERROR");
                    });
                },

                addError: function(field, message) {
                    var self = this;
                },

                render: function () {
                    if (this.template && this.$el) $(this.$el).html(this.template({model: this.model}));
                }
            });
        };
    });