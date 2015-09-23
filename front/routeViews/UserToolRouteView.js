define(['jquery', 'backbone', 'abstract/RouteView', 'text!components/usertool/templates/UserToolTemplate.html', 'underscore', 'components/usertool/models/UserToolModel', 'components/usertool/views/UserToolView'],
    function($, bb, RouteView, template, _, UserToolModel, UserToolView) {
    return new function() {
        return RouteView.extend({
            loadTemplate: function() {
                this.template = _.template(template);
            },
            loadViews: function() {
                var element = $(this.el);
                new UserToolView({model: new UserToolModel(), el: element});
            }
        });
    };
});