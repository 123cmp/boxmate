bm.UserToolView = Backbone.View.extend({

    imageWithCanvasModel: null,
    imageWithCanvasView: null,

    userKitView: null,

    setMode: function(mode) {
        console.log(mode);
        this.imageWithCanvasModel.set("mode", mode);
    },

    initialize: function () {
        if (!this.imageWithCanvasModel) this.imageWithCanvasModel = new bm.ImageWithCanvasModel();
        if (!this.imageWithCanvasView) {
            this.imageWithCanvasView = new bm.ImageWithCanvasView({model: this.imageWithCanvasModel});
            this.imageWithCanvasView.render();
        }
        if (!this.userKitView) {
            this.userKitView = new bm.UserKitView({model: {setMode: this.setMode, context: this}});
        }
    }

});


