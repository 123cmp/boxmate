bm.ImageModel = Backbone.Model.extend({
    defaults: {
        id: 0,
        name: "",
        path: "",
        project: null, //ref to UserModel
        tasks: null, //array of TaskModel
        owner: null //ref to UserModel
    }
});


