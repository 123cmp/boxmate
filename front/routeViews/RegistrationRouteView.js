define(['jquery', 'backbone', 'abstract/RouteView', 'text!components/accounting/templates/RegistrationTemplate.html', 'underscore', 'components/accounting/models/RegistrationModel', 'components/accounting/views/RegistrationView'],
    function($, bb, RouteView, template, _, RegistrationModel, RegistrationView) {
    return new function() {
        return RouteView.extend({
            loadTemplate: function() {
                this.template = _.template(template);
            },
            loadViews: function() {
                var element = this.el;
                new RegistrationView({model: new RegistrationModel(), el: element});
            }
        });
    };
});