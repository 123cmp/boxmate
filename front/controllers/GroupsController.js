App.GroupsController = Ember.ArrayController.extend({
    actions: {
       createGroup: function() {
           var group = this.store.createRecord('group', {
               name: this.get('newName')
           });
           this.set('newName', "");
           group.save();
       }
    }
});
