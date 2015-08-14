App.ProjectsRoute = Ember.Route.extend({
    model: function(params) {
       /** console.log(this.store.find('project', params.group_id));
        return this.store.find('project', params.group_id);   */

        return this.store.find('project');
    }

});