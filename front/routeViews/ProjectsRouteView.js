define(['jquery', 'backbone', 'abstract/RouteView', 'underscore', 'components/projects/views/ProjectsView', 'components/projects/models/ProjectsCollection'],
    function($, bb, RouteView, _, ProjectsView, ProjectsCollection) {
    return new function() {
        return RouteView.extend({
            loadTemplate: function() {
                this.template = _.template("");
            },
            loadViews: function() {
                var element = this.el;
                new ProjectsView({model: new ProjectsCollection(), el: element});
            }

        });
    };
});