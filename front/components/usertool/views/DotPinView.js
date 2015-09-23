bm.DotPinView = Backbone.View.extend({
    el: null,

    commentTemplate: "" +
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

    addComment: function(el) {
        var __self = this;
        var commentText = $(el).val();
        var commentsBlock = $(__self.el).find(".comments-block");
        var commentsBlockClass = commentsBlock.hasClass("no-comments") ? "no-comments" : commentsBlock.hasClass("one-comments") ? "one-comments" : "two-comments";
        commentsBlock.append(__self.commentTemplate);
        var commentsBlockHeight = 0;
        var comments = commentsBlock.find(".field-comments");
        comments.each(function(i, comment) {
            commentsBlockHeight += $(comment).height();
        });

        var commentsBlockClassWill = comments.length + 1 == 0 ? "no-comments" : commentsBlockHeight < 324 ? "one-comments" : "two-comments";
        if(commentsBlockClass != commentsBlockClassWill) commentsBlock.removeClass(commentsBlockClass).addClass(commentsBlockClassWill);
    },

    addListeners: function() {
        var __self = this;
        $(__self.el).find(".button-click").click(function() {
            __self.addComment($(__self.el).find("textarea"));
        });
    },

    initialize: function () {
        this.el = $(this.model.get("el"));
        this.addListeners();
    }

});


