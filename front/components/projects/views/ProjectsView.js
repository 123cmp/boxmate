define(['backbone', 'text!components/projects/templates/ProjectsTemplate.html', 'components/projects/views/ProjectView', 'components/projects/models/ProjectModel'],
    function (bb, template, ProjectView) {
        return bb.View.extend({
            initialize: function () {
                var self = this;
                self.template = _.template(template);
                self.render();
                $.when(self.model.fetch()).then(function () {
                    self.createProjects();
                });
            },

            render: function () {
                if (this.template && this.$el) $(this.$el).html(this.template());
            },

            createProjects: function () {
                var projectsContainer = $(this.$el).find('.bm-projects-container');
                this.model.each(function (project) {
                    new ProjectView({model: project, el: projectsContainer})
                });
            }

        })
    }
);