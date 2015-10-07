define(['backbone', 'text!components/projects/templates/ProjectPageTemplate.html'],
    function(bb, template) {
        return bb.View.extend({
            initialize: function() {
                var self = this;
                self.template = _.template(template);
                self.model.fetch().then(function() {
                    self.render();
                });
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
