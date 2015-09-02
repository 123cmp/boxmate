bm.PinnerView = Backbone.View.extend({
    el: "#image-container",
    pinTemplateName: "PinTemplate.html",
    pinTemplate: "",
    pinLayer: null,
    isSquare: false,
    mousedown: this.startPin,
    mousemove: this.movePin,
    mouseup: this.stopPin,
    touchstart: this.startPin,
    touchmove: this.movePin,
    touchend: this.stopPin,
    color: "",
    coors: {},
    refreshTimer: null,
    initTimer: null,
    timer: null,
    save: null,
    dotPinSize: null,

    //dotPinSize: {
    //    width: 256,
    //    height: 174,
    //    number: {
    //        width: 32,
    //        height: 32,
    //        offsetLeft: 30
    //    }
    //},

    initVars: function() {
        this.refreshTimer = this.model.get("refreshTimer");
        this.initTimer = this.model.get("initTimer");
        this.timer = this.model.get("timer");
        this.save = this.model.get("save");
        this.color = this.model.get("color");
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


    initialize: function() {
            var __self = this;
            if(__self.model) __self.initVars();
            if (!__self.pinTemplate) {
                $.when(bm.TemplateStore.get(__self.pinTemplateName)).then(function (template) {
                    if (template) {
                        __self.pinTemplate = _.template(template);
                        __self.initPinLayer();
                    }
                });
            }
    }
});