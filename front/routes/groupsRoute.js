App.GroupsRoute = Ember.Route.extend({
   model: function() {
       return this.store.find('group');
   }

});