bm.UserModel = Backbone.Model.extend({
    defaults: {
        name: "",
        email: "",
        password: "",
        options: null, //object
        projects: null, //array
        tasks: null //array
    }
});

