define(['jquery', 'backbone', 'abstract/RouteView', 'text!components/projects/templates/ProjectsTemplate.html', 'underscore', 'components/projects/views/ProjectsView', 'components/projects/models/ProjectsCollection'],
    function($, bb, RouteView, template, _, ProjectsView, ProjectsCollection) {
    return new function() {
        return RouteView.extend({
            loadTemplate: function() {
                this.template = _.template(template);
            },
            loadViews: function() {
                var element = this.el;
                new ProjectsView({model: new ProjectsCollection(), el: element});
            }

        });
    };
});