bm.ImageWithCanvasView = Backbone.View.extend({
    el: "#image-container",

    templateName: "ImageWithCanvasTemplate.html",
    pinTemplateName: "PinTemplate.html",
    template: "",
    pinTemplate: "",
    compiled: null,
    clearMode: false,
    timer: null,
    SAVE_TIMEOUT: 2000,
    imageData: null,

    refreshTimer: function() {
        if(this.timer) clearTimeout(this.timer);
        this.initTimer();
    },

    initTimer: function() {
        var __self = this;
        __self.timer = setTimeout(function() {
            __self.save()
        }, __self.SAVE_TIMEOUT);
    },

    save: function() {
        var canvas = $(".canvas").get(0);
        var img    = canvas.toDataURL("image/png");
       console.log("Saving", img)
    },

    switchClearMode: function() {
        this.clearMode = !this.clearMode;
        this.clearMode ? this.clear() : this.show();
    },

    initialize: function () {
        var __self = this;
        if (!__self.model) __self.model = new bm.ImageWithCanvasModel();
        __self.model.bind("change:mode", function () {
            var mode = __self.model.get("mode");
            if(mode == "clear") __self.switchClearMode();
            if(mode == "selection") {
                $(".dot-pin").draggable();
            }
        });
    },

    clear: function() {
        $(this.el).find(".canvas").hide();
        $(this.el).find(".pin").hide();
    },

    show: function() {
        $(this.el).find(".canvas").show();
        $(this.el).find(".pin").show();
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
            color: "#FF0000",
            refreshTimer: this.refreshTimer,
            initTimer: this.initTimer,
            save: this.save,
            timer: this.timer,
            SAVE_TIMEOUT: this.SAVE_TIMEOUT,

        }
    },

    initPiner: function() {
        var __self = this;

        if (!__self.pinTemplate) {
            $.when(bm.TemplateStore.get(__self.pinTemplateName)).then(function (template) {
                if (template) {
                    console.log(__self.pinTemplate);
                    __self.pinTemplate = _.template(template);
                    __self.piner = {
                        pinLayer: null,
                        isSquare: false,
                        mousedown: __self.startPin,
                        mousemove: __self.movePin,
                        mouseup: __self.stopPin,
                        touchstart: __self.startPin,
                        touchmove: __self.movePin,
                        touchend: __self.stopPin,
                        color: "#FF0000",
                        coors: {},
                        refreshTimer: __self.refreshTimer,
                        initTimer: __self.initTimer,
                        timer: __self.timer,
                        SAVE_TIMEOUT: __self.SAVE_TIMEOUT,
                        save: __self.save,
                        dotPinTemplate: __self.pinTemplate,
                        dotPinSize: {
                            width: 256,
                            height: 174,
                            number: {
                                width: 32,
                                height: 32,
                                offsetLeft: 30
                            }
                        }
                    };
                    __self.initPinLayer();
                }
            });
        }

    },

    events: {
        "mousedown": "drawOrPin",
        "mousemove": "drawOrPin",
        "mouseup": "drawOrPin",
        "mouseleave": "drawOrPin",
        "touchstart": "drawOrPin",
        "touchmove": "drawOrPin",
        "touchend": "drawOrPin"
    },

    drawOrPin: function(e) {

        var canvasPosition = $('.canvas').offset();
        var coors = {
            x: e.pageX - canvasPosition.left,
            y: e.pageY - canvasPosition.top
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

        this.refreshTimer();
        var pin = $("<div></div>");
        pin.addClass("pin");
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
            console.log("dotpin", this.dotPinTemplate);
            var containerPositionLeft = 0;
            var containerPositionTop = 0;
            var containerClass = "";
            console.log(this);
            if(coors.y + this.dotPinSize.height > this.pinLayer.height()) {
                containerClass = "click-bottom-";
                containerPositionTop = coors.y + (this.dotPinSize.number.height / 2) - this.dotPinSize.height;
            } else {
                containerClass = "click-";
                containerPositionTop = coors.y - (this.dotPinSize.number.height / 2) ;
            }
            if(coors.x + this.dotPinSize.width > this.pinLayer.width()) {
                containerClass += "right";
                containerPositionLeft = coors.x + (this.dotPinSize.number.width / 2) + this.dotPinSize.number.offsetLeft - this.dotPinSize.width;
            } else {
                containerClass += "left";
                containerPositionLeft = coors.x - (this.dotPinSize.number.width / 2) - this.dotPinSize.number.offsetLeft;
            }
            pin.addClass("dot-pin")
                .addClass("main-click-message")
                .addClass(containerClass)
                .html(this.dotPinTemplate)
                .css("left", containerPositionLeft)
                .css("top", containerPositionTop )
                .find("textarea").blur(function() {
                    console.log("textarea into div");
                })
        }

        this.coors = null; this.isSquare = false;
        this.pinLayer.append(pin);
        autosize(pin.find("textarea"));
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

    initCanvas: function () {
        var canvas = $(this.el).find('#canvas');
        canvas.attr("width", canvas.width()+"px");
        canvas.attr("height", canvas.height()+"px");
        this.drawer.context = canvas.get(0).getContext('2d');
    },

    initPinLayer: function () {
        var __self = this;
        __self.piner.pinLayer = $(__self.el);

    },

    render: function () {
        var __self = this;
        if (__self.template) {
            $(this.el).html(this.compiled());
            $(__self.el).find(".image-with-canvas-image").load(function() {
                __self.initDrawer();
                __self.initCanvas();
                __self.initPiner();

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


