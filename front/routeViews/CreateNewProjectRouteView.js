define(['jquery', 'backbone', 'abstract/RouteView', 'text!components/projects/templates/CreateNewProjectTemplate.html', 'underscore', 'components/projects/views/CreateProjectView', 'components/projects/models/CreateNewProjectModel'],
    function($, bb, RouteView, template, _, CreateProjectView, CreateNewProjectModel) {
    return new function() {
        return RouteView.extend({
            loadTemplate: function() {
                this.template = _.template(template);
            },
            loadViews: function() {
                var formContainer = $(this.el).find('.data-field');
                new CreateProjectView({model: new CreateNewProjectModel(), el: formContainer});
            }
        });
    };
});