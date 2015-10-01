define(['abstract/RouteView', 'text!components/accounting/templates/ProfileTemplate.html', 'underscore', 'components/accounting/models/ProfileFormModel',
        'components/accounting/views/ProfileFormView', 'components/projects/views/ActiveProjectsView', 'components/projects/models/ProjectsCollection'],
    function(RouteView, template, _, ProfileFormModel, ProfileFormView, ActiveProjectsView, ProjectsCollection) {
    return new function() {
        return RouteView.extend({
            loadTemplate: function() {
                this.template = _.template(template);
            },
            loadViews: function() {
                var formElement = $(this.el).find(".field-left");
                new ProfileFormView({model: new ProfileFormModel(), el: formElement});
                var activeProjectsElement = $(this.el).find(".list-active-project");
                new ActiveProjectsView({model: new ProjectsCollection(), el: activeProjectsElement});
            }
        });
    };
});