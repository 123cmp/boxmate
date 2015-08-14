App = Ember.Application.create({
    LOG_TRANSITIONS: false
});
App.ApplicationAdapter = DS.FixtureAdapter;

App.Router.map(function() {
    this.resource('groups' );
    this.resource('projects', {path: "groups/:group_id"});
    this.route('upload');
});


//    = DS.Store.extend({
//    adapter: DS.FixtureAdapter
//});


/*App.IndexRoute = Ember.Route.extend({
    setupController: function(controller) {
        controller.set('title', 'Boxmate');
    }
});

App.UploadRoute = Ember.Route.extend({
    //setupController: UploadController
});

App.ProjectsRoute = Ember.Route.extend({
    setupController: function(controller) {
        controller.set('title', 'Boxmate/projects');
    }
});
App.TestRoute = Ember.Route.extend({
    setupController: function(controller) {
        controller.set('title', 'Boxmate/test');
    }
}); */

