define(['backbone', 'text!components/projects/templates/ProjectTemplate.html'],
    function(bb, template) {
        return bb.View.extend({
            initialize: function() {
                this.template = _.template(template);
                this.render();
            },

            render: function () {
                var self = this;
                if(self.template && self.$el) {
                    $(self.$el).append(self.template({model: self.model.toJSON()}));
                }
            }
        })
    }
);
