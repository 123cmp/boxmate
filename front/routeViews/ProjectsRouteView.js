define(['jquery', 'backbone', 'routeViews/RouteView', 'text!templates/HomeTemplate.html'], function($, bb, RouteView, template) {
    return new function() {

        return RouteView.extend({
            loadTemplate: function() {
                console.log("loadTemplate", template);
            }
        });
    };
});