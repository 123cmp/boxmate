bm.UserToolView = Backbone.View.extend({

    imageWithCanvasModel: null,
    imageWithCanvasView: null,

    userKitView: null,

    setMode: function(mode) {
        var currentMode = this.imageWithCanvasModel.get("mode");
        this.imageWithCanvasModel.set("mode", mode);
        if(currentMode == mode) this.imageWithCanvasModel.trigger("change:mode", this.imageWithCanvasModel);
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


