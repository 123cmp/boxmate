bm.ImageWithCanvasView = Backbone.View.extend({
    el: "#image-container",

    templateName: "ImageWithCanvasTemplate.html",
    template: "",
    compiled: null,

    initialize: function () {
        var __self = this;
        if (!__self.model) __self.model = new bm.ImageWithCanvasModel();
        __self.model.bind("change:mode", function () {
            var mode = __self.model.get("mode");
            console.log(mode)
        });
    },



    compileTemplate: function (template) {
        if (template.indexOf("{{image}}" >= 0)) {
            var image = this.model.get('image');
            if (image) template = template.replace("{{image}}", image);
        }
        return _.template(template)
    },
    drawer: {},
    piner: {},

    initDrawer: function() {
        this.drawer = {
            isDrawing: false,
            mousedown: this.startDraw,
            mousemove: this.moveDraw,
            mouseup: this.stopDraw,
            mouseleave: this.stopDraw,
            touchstart: this.startDraw,
            touchmove: this.moveDraw,
            touchend: this.stopDraw,
            color: "#FF0000"
        }
    },

    initPiner: function() {
        this.piner = {
            pinLayer: null,
            isSquare: false,
            mousedown: this.startPin,
            mousemove: this.movePin,
            mouseup: this.stopPin,
            touchstart: this.startPin,
            touchmove: this.movePin,
            touchend: this.stopPin,
            color: "#FF0000",
            coors: {}
        }
    },

    events: {
        "mousedown .canvas": "drawOrPin",
        "mousemove .canvas": "drawOrPin",
        "mouseup .canvas": "drawOrPin",
        "mouseleave .canvas": "drawOrPin",
        "touchstart .canvas": "drawOrPin",
        "touchmove .canvas": "drawOrPin",
        "touchend .canvas": "drawOrPin"
    },

    drawOrPin: function(e) {
        var coors = {
            x: e.offsetX,//e.clientX - canvasPosition.left,
            y: e.offsetY//e.clientY - canvasPosition.top
        };
        if(!coors.x && !coors.y && e.targetTouches && e.targetTouches[0]) {
            coors = {
                x: e.targetTouches[0].offsetX, // - canvasPosition.left,
                y: e.targetTouches[0].offsetY // - canvasPosition.top
            }
        }
        var mode = this.model.get("mode");
        if(mode == "drawing") this.draw(coors, e);
        if(mode == "pining") this.pin(coors, e);
    },

    pin: function (coors, e) {
        if(this.piner[e.type]) this.piner[e.type](coors);
    },

    startPin: function (coors) {
        this.coors = coors;
    },

    movePin: function (coors) {
        if(this.coors && (coors.x > this.coors.x + 40 || coors.x < this.coors.x - 40) && (coors.y > this.coors.y + 40 || coors.y < this.coors.y - 40)) {
            this.isSquare = true;
        }
    },

    stopPin: function (coors) {
        var pin = $("<div></div>");

        if(this.isSquare) {
            pin.addClass("square-pin");
            if(coors.x > this.coors.x) {
                pin.css("left", this.coors.x)
            } else {
                pin.css("left", coors.x)
            }
            if(coors.y > this.coors.y) {
                pin.css("top", this.coors.y)
            } else {
                pin.css("top", coors.y)
            }
            var width = Math.abs(this.coors.x - coors.x);
            var height = Math.abs(this.coors.y - coors.y);
            pin.css("width", width);
            pin.css("height", height);
        } else {
            pin.addClass("dot-pin")
               .text("qweasd")
               .css("left", coors.x)
               .css("top", coors.y);
        }

        this.coors = null; this.isSquare = false;
        this.pinLayer.append(pin);
    },

    draw: function (coors, e) {
        this.drawer[e.type](coors);
    },
    startDraw: function (coors) {
        this.context.beginPath();
        this.context.moveTo(coors.x, coors.y);
        this.isDrawing = true;
    },
    moveDraw: function (coors) {
        if (this.isDrawing) {
            this.context.strokeStyle = this.color;
            this.context.lineJoin = "round";
            this.context.lineWidth = 3;
            this.context.lineTo(coors.x, coors.y);
            this.context.stroke();
        }
    },
    stopDraw: function (coors) {
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

    initPinLayer: function () {
        this.piner.pinLayer = $(this.el);
        console.log(this.piner.pinLayer);
    },

    render: function () {
        var __self = this;
        if (__self.template) {
            $(this.el).html(this.compiled());
            $(__self.el).find(".image-with-canvas-image").load(function() {
                __self.initDrawer();
                __self.initCanvas();
                __self.initPiner();
                __self.initPinLayer();
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


