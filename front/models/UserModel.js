bm.UserModel = Backbone.Model.extend({
    defaults: {
        id: 0,
        name: "",
        email: "",
        password: "",
        repeat: "",
        subscribe: false, //object
        projects: null, //array of ProjectModel
        tasks: null //array of TaskModel
    }
});

