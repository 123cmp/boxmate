bm.UploadFieldView = Backbone.View.extend({
    el: "#upload-field",

    template: _.template("<div>UPLOAD</div>"),

    events: {
        "drop #field" : "dropHandler",
        "dragover #field" : "dragOver"
    },

    init: function() {

    },

    dropHandler: function (event) {
        event.stopPropagation();
        event.preventDefault();
    },

    dragOver: function (event) {
        event.preventDefault();
    },

    render: function () {
        console.log("rerender");
        $(this.el).html(this.template());
    }
});


