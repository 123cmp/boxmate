define(['jquery', 'backbone', 'abstract/RouteView', 'text!components/accounting/templates/AuthorizationTemplate.html', 'components/accounting/models/AuthorizationModel', 'components/accounting/views/AuthFormView', 'underscore'],
    function($, bb, RouteView, template, AuthModel, AuthView, _) {
        return new function() {
            return RouteView.extend({
                loadTemplate: function() {
                    this.template = _.template(template);
                },
                loadViews: function() {
                    var formContainer = $(this.el).find('.field-left');
                    new AuthView({model: new AuthModel(), el: formContainer});
                }
            });
        };
    });