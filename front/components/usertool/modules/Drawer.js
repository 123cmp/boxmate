bm.Drawer = function(obj) {
    var model = obj.model;
    return {
        el: "#image-container",
        isDrawing: false,
        mousedown: this.startDraw,
        mousemove: this.moveDraw,
        mouseup: this.stopDraw,
        mouseleave: this.stopDraw,
        touchstart: this.startDraw,
        touchmove: this.moveDraw,
        touchend: this.stopDraw,
        color: "#FF0000",
        SAVE_TIMEOUT: this.SAVE_TIMEOUT,
        model: model,
        refreshTimer: null,
        initTimer: null,
        timer: null,
        save: null,
        context: null,

        initVars: function () {

            this.refreshTimer = this.model.get("refreshTimer");
            this.initTimer = this.model.get("initTimer");
            this.timer = this.model.get("timer");
            this.save = this.model.get("save");
            this.color = this.model.get("color");
            this.context = this.model.get("context");
            this.model.set("draw", this.draw);

            this.mousedown = this.startDraw;
            this.mousemove = this.moveDraw;
            this.mouseup = this.stopDraw;
            this.touchstart = this.startDraw;
            this.touchmove = this.moveDraw;
            this.touchend = this.stopDraw;
            console.log("init");
        },

        draw: function (coors, e) {
            if(this[e.type]) this[e.type](coors);
        },

        startDraw: function (coors) {
            this.context.beginPath();
            this.context.moveTo(coors.x, coors.y);
            this.isDrawing = true;
        },
        moveDraw: function (coors) {
            if (this.isDrawing) {
                this.refreshTimer();
                this.context.strokeStyle = this.color;
                this.context.lineJoin = "round";
                this.context.lineWidth = 3;
                this.context.lineTo(coors.x, coors.y);
                this.context.stroke();
            }
        },
        stopDraw: function (coors) {
            if (this.isDrawing) {
                this.refreshTimer();
                this.touchmove(coors);
                this.isDrawing = false;
            }
        },

        initialize: function () {
            var __self = this;
            if (__self.model) __self.initVars();
            return __self;
        }
    };
};