bm.ProjectModel = Backbone.Model.extend({
    defaults: {
        id: 0,
        name: "",
        options: null, //object
        users: null, //array of UserModel
        images: null, //array of ImageModel
        owner: null //ref to UserModel
    }
});


