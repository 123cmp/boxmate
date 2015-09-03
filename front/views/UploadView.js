bm.UploadView = Backbone.View.extend({
    el: ".bm-upload",

    events: {
        "change .bm-pc-upload": "upload"
    },

    upload: function(e) {
        var formData = new FormData();
        if($(e.target)[0].files) {
            $.each($(e.target)[0].files, function(i, file) {
                formData.append('file'+i, file);
            });
        }
        bm.ApiService.addImage(formData);
        $(e.target).replaceWith( $(e.target).clone( true ) );
    }

});


