bm.ImageWithCanvasView = Backbone.View.extend({
    el: "#image-container",

    templateName: "ImageWithCanvasTemplate.html",
    userColor: "#FF0000",
    template: "",
    pinerModel: null,
    drawerModel: null,
    drawer: null,
    piner: null,

    compiled: null,
    clearMode: false,
    timer: null,
    SAVE_TIMEOUT: 2000,
    imageData: null,

    events: {
        "mousedown": "drawOrPin",
        "mousemove": "drawOrPin",
        "mouseup": "drawOrPin",
        "mouseleave": "drawOrPin",
        "touchstart": "drawOrPin",
        "touchmove": "drawOrPin",
        "touchend": "drawOrPin",
        "click .collapse-block-left": "hideBlock",
        "click .button-open-correction": "showBlock"

    },

    hideBlock: function(){
        $(this.el).find(".right-open-block").hide();
    },

    showBlock: function(){
        $(this.el).find(".right-open-block").show();
    },

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
        var img = canvas.toDataURL("image/png");
    },

    switchClearMode: function() {
        this.clearMode = !this.clearMode;
        this.clearMode ? this.clear() : this.show();
    },

    initialize: function () {
        var __self = this;
        if (!__self.model) __self.model = new bm.ImageWithCanvasModel();
        __self.model.bind("change:mode", function() {
            __self.changeModeHandler()
        });
    },

    changeModeHandler: function() {
        var __self = this;
        var mode = __self.model.get("mode");
        if(mode == "clear") __self.switchClearMode();
        if(mode == "selection") {
            $(".dot-pin").draggable();
        }
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

    calculateCoors: function(e) {
        var canvasPosition = $(this.el).find('#canvas').offset();
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
        return coors;
    },

    drawOrPin: function(e) {
        if(!$(e.target).hasClass("canvas")) {
            return true;
        }
        var coors = this.calculateCoors(e);
        var mode = this.model.get("mode");
        if(mode == "drawing") {
            this.drawerModel.get("draw").call(this.drawer, coors, e);
        }

        if(mode == "pining") this.pinerModel.get("pin").call(this.piner, coors, e);
    },

    initCanvas: function () {
        var canvas = $(this.el).find('#canvas');
        canvas.attr("width", canvas.width()+"px");
        canvas.attr("height", canvas.height()+"px");
        this.drawer.context = canvas.get(0).getContext('2d');
    },

    initPiner: function() {
        var __self = this;
        __self.pinerModel = new bm.PinerModel({
            color: __self.userColor,
            refreshTimer: __self.refreshTimer,
            initTimer: __self.initTimer,
            timer: __self.timer,
            save: __self.save
        });
        __self.piner = new bm.Piner({model: __self.pinerModel}).initialize();
    },

    initDrawer: function() {
        var __self = this;
        __self.drawerModel = new bm.DrawerModel({
            color: __self.userColor,
            refreshTimer: __self.refreshTimer,
            initTimer: __self.initTimer,
            timer: __self.timer,
            save: __self.save
        });
        __self.drawer = new bm.Drawer({model: __self.drawerModel}).initialize();
    },

    render: function () {
        var __self = this;
        if (__self.template) {
            $(this.el).html(this.compiled());
            $(__self.el).find(".image-with-canvas-image").load(function() {
                __self.initDrawer();
                __self.initPiner();
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


