define(['abstract/RouteView', 'underscore', 'components/projects/views/ProjectPageView', 'components/projects/models/ProjectModel'],
    function(RouteView, _, ProjectPageView, ProjectModel) {
    return new function() {
        return RouteView.extend({
            loadTemplate: function() {
                this.template = _.template("");
            },
            loadViews: function() {
                var element = this.el;
                new ProjectPageView({model: new ProjectModel({id: this.id}), el: element});
            }
        });
    };
});