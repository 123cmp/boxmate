bm.UploadView = Backbone.View.extend({
    el: ".bm-upload",
    id: 0,

    events: {
        "change .bm-pc-upload": "upload"
    },

    initialize: function() {
        console.log(this.model.get("id"));
        this.id = this.model.get("id");
    },

    upload: function(e) {
        var formData = new FormData();
        if($(e.target)[0].files) {
            $.each($(e.target)[0].files, function(i, file) {
                formData.append('file', file);
            });
        }
        bm.ApiService.addImage(formData, this.id);
        $(e.target).replaceWith( $(e.target).clone( true ) );
    }

});


