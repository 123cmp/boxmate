bm.DotPinView = Backbone.View.extend({
    el: null,

    CommentTemplate: "" +
    "<div class='field-comments left large-12 small-12 medium-12'>" +
    "<a class='name-user left large-5 small-12 medium-5' href='/'>" +
    "User name" +
    "</a> "+
    "<p class='data-comments right large-7 small-5 medium-5'>" +
    "01/09/2015 09:00" +
    "</p>" +
    "<p class='comments-text left large-12 small-12 medium-12 '>" +
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam" +
    "velit, vulputate eu pharetra" +
    "</p>" +
    "<div class='edit-text left large-12 small-12 medium-12'>" +
    "<button class='pencil'>" +
    "<i class='fa fa-pencil-square-o pencil'></i>" +
    "</button>" +
    "<button class='trash'>" +
    "<i class='fa fa-trash-o trash'></i>" +
    "</button>" +
    "</div>",

    addComment: function() {
        console.log("textarea into div");
    },

    addListeners: function() {
        $(this.el).find(".button-click")
    },

    initialize: function () {
        this.el = $(this.model.get("el"));
        this.addListeners();
    }

});


