bm.ImageModel = Backbone.Model.extend({
    defaults: {
        id: 0,
        title: "",
        description: "",
        wrapper: null, // obj coordinates and size of wrapper
        image: null, //ref to ImageModel
        owner: null //ref to UserModel
    }
});


