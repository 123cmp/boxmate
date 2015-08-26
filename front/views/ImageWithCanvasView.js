bm.ImageWithCanvasView = Backbone.View.extend({
    el: "#image-container",

    templateName: "ImageWithCanvasTemplate.html",
    template: "",
    compiled: null,

    initialize: function () {
        if (!this.model) this.model = new bm.ImageWithCanvasModel();
    },

    compileTemplate: function (template) {
        if (template.indexOf("{{image}}" >= 0)) {
            var image = this.model.get('image');
            if (image) template = template.replace("{{image}}", image);
        }
        return _.template(template)
    },
    drawer: {},

    initDrawer: function() {
        console.log(this);
        this.drawer = {
            isDrawing: false,
            mousedown: this.start,
            mousemove: this.move,
            mouseup: this.stop,
            mouseleave: this.stop,
            touchstart: this.start,
            touchmove: this.move,
            touchend: this.stop
        }
    },

    events: {
        "mousedown .canvas": "draw",
        "mousemove .canvas": "draw",
        "mouseup .canvas": "draw",
        "mouseleave .canvas": "draw",
        "touchstart .canvas": "draw",
        "touchmove .canvas": "draw",
        "touchend .canvas": "draw"
    },

    draw: function (e) {
        var canvas = $(this.el).find(".canvas");
        var canvasPosition = canvas.offset();
        var coors = {
            x: e.clientX - canvasPosition.left,
            y: e.clientY - canvasPosition.top
        };
        if(!coors.x && !coors.y && e.targetTouches && e.targetTouches[0]) {
            coors = {
                x: e.targetTouches[0].pageX - canvasPosition.left,
                y: e.targetTouches[0].pageY - canvasPosition.top
            }
        }
        console.log(coors);
        this.drawer[e.type](coors);
    },
    start: function (coors) {
        console.log(this);
        this.context.beginPath();
        this.context.moveTo(coors.x, coors.y);
        this.isDrawing = true;
    },
    move: function (coors) {
        if (this.isDrawing) {
            this.context.strokeStyle = "#000";
            this.context.lineJoin = "round";
            this.context.lineWidth = 10;
            this.context.lineTo(coors.x, coors.y);
            this.context.stroke();
        }
    },
    stop: function (coors) {
        if (this.isDrawing) {
            this.touchmove(coors);
            this.isDrawing = false;
        }
    },

    initCanvas: function () {
        var canvas = $(this.el).find('#canvas');
        canvas.attr("width", canvas.width()+"px");
        canvas.attr("height", canvas.height()+"px");
        this.drawer.context = canvas.get(0).getContext('2d');
    },

    render: function () {
        var __self = this;
        if (__self.template) {
            $(this.el).html(this.compiled());
            $(__self.el).find(".image-with-canvas-image").load(function() {
                console.log("init");
                __self.initDrawer();
                __self.initCanvas();
            })
        } else {
            $.when(bm.TemplateStore.get(__self.templateName)).then(function (template) {
                if (template) {
                    __self.template = template;
                    __self.compiled = __self.compileTemplate(__self.template);
                    __self.render();
                }
            });
        }
    }


});


