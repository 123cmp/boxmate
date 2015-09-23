bm.Piner = function(obj) {
    var model = obj.model;
    return {
        el: "#image-container",
        pinTemplateName: "PinTemplate.html",
        pinTemplate: "",
        pinLayer: null,
        isSquare: false,
        mousedown: null,
        mousemove: null,
        mouseup: null,
        touchstart: null,
        touchmove: null,
        touchend: null,
        color: "",
        coors: {},
        refreshTimer: null,
        initTimer: null,
        timer: null,
        save: null,
        pinNumber: 0,
        model: model,
        dotPinSize: {
            width: 256,
            height: 174,
            number: {
                width: 32,
                height: 32,
                offsetLeft: 30
            }
        },


        initVars: function () {
            this.refreshTimer = this.model.get("refreshTimer");
            this.initTimer = this.model.get("initTimer");
            this.timer = this.model.get("timer");
            this.save = this.model.get("save");
            this.color = this.model.get("color");
            this.model.set("pin", this.pin);
            if(this.model.get("tasks")) this.pinNumber = this.model.get("tasks").length;

            this.mousedown = this.startPin;
            this.mousemove= this.movePin;
            this.mouseup= this.stopPin;
            this.touchstart= this.startPin;
            this.touchmove= this.movePin;
            this.touchend= this.stopPin;
        },

        pin: function (coors, e) {
            if (this[e.type]) this[e.type](coors);
        },

        startPin: function (coors) {
            this.coors = coors;
        },

        movePin: function (coors) {
            if (this.coors && (coors.x > this.coors.x + 40 || coors.x < this.coors.x - 40) && (coors.y > this.coors.y + 40 || coors.y < this.coors.y - 40)) {
                this.isSquare = true;
            }
        },

        stopPin: function (coors) {
            this.refreshTimer();
            var pin = $("<div></div>");
            pin.addClass("pin");
            pin = this.isSquare ? this.squarePin(pin, coors) : this.dotPin(pin, coors);
            this.coors = null;
            this.isSquare = false;
            this.pinLayer.append(pin);
        },

        squarePin: function(pin, coors) {
            pin.addClass("square-pin");
            if (coors.x > this.coors.x) {
                pin.css("left", this.coors.x)
            } else {
                pin.css("left", coors.x)
            }
            if (coors.y > this.coors.y) {
                pin.css("top", this.coors.y)
            } else {
                pin.css("top", coors.y)
            }
            var width = Math.abs(this.coors.x - coors.x);
            var height = Math.abs(this.coors.y - coors.y);
            pin.css("width", width);
            pin.css("height", height);

            return pin;
        },

        dotPin: function(pin, coors) {
            var containerPositionLeft = 0;
            var containerPositionTop = 0;
            var containerClass = "";
            var __self = this;

            if (coors.y + this.dotPinSize.height > this.pinLayer.height()) {
                containerClass = "click-bottom-";
                containerPositionTop = coors.y + (this.dotPinSize.number.height / 2) - this.dotPinSize.height;
            } else {
                containerClass = "click-";
                containerPositionTop = coors.y - (this.dotPinSize.number.height / 2);
            }
            if (coors.x + this.dotPinSize.width > this.pinLayer.width()) {
                containerClass += "right";
                containerPositionLeft = coors.x + (this.dotPinSize.number.width / 2) + this.dotPinSize.number.offsetLeft - this.dotPinSize.width;
            } else {
                containerClass += "left";
                containerPositionLeft = coors.x - (this.dotPinSize.number.width / 2) - this.dotPinSize.number.offsetLeft;
            }


            pin.addClass("dot-pin")
                .addClass("main-click-message")
                .addClass(containerClass)
                .html(this.pinTemplate)
                .css("left", containerPositionLeft)
                .css("top", containerPositionTop)

            pin.find(".message-number")
                .text(String(++__self.pinNumber))
                .click(function() {
                    var parent = $(this).parent();
                    var willExpanded = !__self.isExpanded(parent);
                    __self.closeAll();
                    if(willExpanded) __self.expand(parent);
                    else __self.close(parent);
                });

            this.closeAll();
            this.expand(pin);

            if(this.model.get("pins")) {

                var pinModel = new bm.PinModel({
                    el: $(pin)
                });
                var pinView = new bm.DotPinView({model: pinModel});
                this.model.get("pins").push({
                    el: $(pin),
                    model: pinModel,
                    view: pinView
                });
            }

            return pin;
        },

        expand: function(pin) {
            pin.addClass("expand");
        },

        isExpanded: function(pin) {

            return pin.hasClass("expand");
        },

        close: function(pin) {
            pin.removeClass("expand");
        },

        closeAll: function() {
            var __self = this;
            $(".dot-pin").each(function(i,v) { __self.close($(v)) });
        },

        initialize: function () {
            var __self = this;
            if (__self.model) __self.initVars();
            if (!__self.pinTemplate) {
                $.when(bm.TemplateStore.get(__self.pinTemplateName)).then(function (template) {
                    if (template) {
                        __self.pinTemplate = _.template(template);
                        __self.pinLayer = $(__self.el);
                    }
                });
            }
            return __self;
        }
    };
};