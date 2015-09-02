bm.ImageWithCanvasView = Backbone.View.extend({
    el: "#image-container",

    templateName: "ImageWithCanvasTemplate.html",
    userColor: "#FF0000",
    template: "",
    pinerModel: new bm.PinerModel(),
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

    initPiner: function() {
        var __self = this;
        this.pinerModel = new bm.PinerModel({
            color: __self.userColor,
            refreshTimer: __self.refreshTimer,
            initTimer: __self.initTimer,
            timer: __self.timer,
            save: __self.save
        });
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


