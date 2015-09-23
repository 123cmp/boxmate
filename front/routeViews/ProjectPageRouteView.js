define(['abstract/RouteView', 'text!components/projects/templates/ProjectPageTemplate.html', 'underscore'],
    function(RouteView, template, _) {
        console.log("init");
    return new function() {
        return RouteView.extend({
            loadTemplate: function() {
                this.template = _.template(template);
            }
        });
    };
});