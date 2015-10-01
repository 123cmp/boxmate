define(['backbone', 'text!components/projects/templates/ProjectsTemplate.html'],
    function (bb, template) {
        return bb.View.extend({
            initialize: function () {
                var self = this;
                self.template = _.template(template);
                $.when(self.model.fetch()).then(function () {
                    self.render();
                });
            },

            render: function () {
                console.log("render", this.model.toJSON());
                if (this.template && this.$el) $(this.$el).html(this.template({model: this.model.toJSON()}));
            }
        })
    }
);