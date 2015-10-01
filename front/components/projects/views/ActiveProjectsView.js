define(['text!components/projects/templates/ActiveProjectsTemplate.html', 'backbone', 'underscore', 'jquery', 'api'],
    function(template, bb, _, $, api) {
        return new function() {
            return bb.View.extend({
                events: {

                },

                template: _.template(template),

                initialize: function() {
                    this.getActiveProjects();
                },

                getActiveProjects: function() {
                    var self = this;
                    api.getActiveProjects().then(function(res) {
                        self.model.set(res);
                        self.render();
                    });
                },

                render: function () {
                    if (this.template && this.$el) $(this.$el).html(this.template({model: this.model}));
                }

            });
        };
    });