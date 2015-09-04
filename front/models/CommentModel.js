bm.CommentModel = Backbone.Model.extend({
    defaults: {
        date: null,
        text: "",
        owner: null //ref to UserModel
    }
});


