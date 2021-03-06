define(['jquery', 'backbone', 'abstract/RouteView', 'text!components/images/templates/HomeTemplate.html', 'underscore'], function($, bb, RouteView, template, _) {
    return new function() {
        return RouteView.extend({
            loadTemplate: function() {
                this.template = _.template(template);
            }
        });
    };
});