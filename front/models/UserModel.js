bm.UserModel = Backbone.Model.extend({
    defaults: {
        id: 0,
        name: "",
        email: "",
        password: "",
        options: null, //object
        projects: null, //array of ProjectModel
        tasks: null //array of TaskModel
    }
});

