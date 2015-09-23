define(['jquery', 'abstract/CanvasProcessor', 'text!components/usertool/templates/PinTemplate.html', 'components/usertool/models/PinModel',
        'components/usertool/views/DotPinView'],
    function ($, CanvasProcessor, pinTemplate, PinModel, DotPinView) {
        return new function () {
            var self = null;
            self = $.extend(CanvasProcessor, this);

            self.init = function () {
                self.isDrawing = false;
                self.color = "#FF0000";
                self.coors = {};
                self.switchedOn = false;
                self.isSquare = false;
                self.dotPinSize = {
                    width: 256,
                    height: 174,
                    number: {
                        width: 32,
                        height: 32,
                        offsetLeft: 30
                    }
                };
                self.pinNumber = 0;
                self.pins = []
            };

            self.startDraw = function (e) {
                if (self.context && self.switchedOn) {
                    self.coors = self.calculateCoors(e);
                }
            };

            self.moveDraw = function (e) {
                var coors = self.calculateCoors(e);
                if (self.coors && (coors.x > self.coors.x + 40 || coors.x < self.coors.x - 40) && (coors.y > self.coors.y + 40 || coors.y < self.coors.y - 40)) {
                    self.isSquare = true;
                }
            };

            self.stopDraw = function (e) {
                self.changed();
                self.createPin(this.isSquare ? 'square' : 'dot', self.calculateCoors(e));
            };

            self.createPin = function(key, coors) {
                var pin = $("<div></div>");
                pin.addClass("pin");
                pin = key == 'square' ? self.squarePin(pin, coors) : self.dotPin(pin, coors);
                self.coors = null;
                self.isSquare = false;
                self.pinLayer.append(pin);
            };

            self.squarePin = function(pin, coors) {
                pin.addClass("square-pin");
                if (coors.x > self.coors.x) {
                    pin.css("left", self.coors.x)
                } else {
                    pin.css("left", coors.x)
                }
                if (coors.y > self.coors.y) {
                    pin.css("top", self.coors.y)
                } else {
                    pin.css("top", coors.y)
                }
                var width = Math.abs(self.coors.x - coors.x);
                var height = Math.abs(self.coors.y - coors.y);
                pin.css("width", width);
                pin.css("height", height);

                return pin;
            };

            self.dotPin = function(pin, coors) {
                var containerPositionLeft = 0;
                var containerPositionTop = 0;
                var containerClass = "";

                if (coors.y + self.dotPinSize.height > self.pinLayer.height()) {
                    containerClass = "click-bottom-";
                    containerPositionTop = coors.y + (self.dotPinSize.number.height / 2) - self.dotPinSize.height;
                } else {
                    containerClass = "click-";
                    containerPositionTop = coors.y - (self.dotPinSize.number.height / 2);
                }
                if (coors.x + self.dotPinSize.width > self.pinLayer.width()) {
                    containerClass += "right";
                    containerPositionLeft = coors.x + (self.dotPinSize.number.width / 2) + self.dotPinSize.number.offsetLeft - self.dotPinSize.width;
                } else {
                    containerClass += "left";
                    containerPositionLeft = coors.x - (self.dotPinSize.number.width / 2) - self.dotPinSize.number.offsetLeft;
                }

                pin.addClass("dot-pin")
                    .addClass("main-click-message")
                    .addClass(containerClass)
                    .html(pinTemplate)
                    .css("left", containerPositionLeft)
                    .css("top", containerPositionTop);

                pin.find(".message-number")
                    .text(String(++self.pinNumber))
                    .click(function() {
                        var parent = $(this).parent();
                        var willExpanded = !self.isExpanded(parent);
                        self.closeAll();
                        if(willExpanded) self.expand(parent);
                        else self.close(parent);
                    });

                self.closeAll();
                self.expand(pin);

                new DotPinView({model: new PinModel({el: $(pin)})});

                return pin;
            };

            self.expand = function(pin) {
                pin.addClass("expand");
            };

            self.isExpanded = function(pin) {
                return pin.hasClass("expand");
            };

            self.close = function(pin) {
                pin.removeClass("expand");
            };

            self.closeAll = function() {
                $(".dot-pin").each(function(i, v) { self.close($(v)) });
            };

            return {
                attach: function (element) {
                    self.attach($(element));
                },
                switchOn: function () {
                    self.switchedOn = true;
                },
                switchOff: function () {
                    self.switchedOn = false;
                },
                toggle: function () {
                    self.switchedOn = !self.switchedOn;
                }
            }
        };
    });


//bm.Piner = function(obj) {
//    var model = obj.model;
//    return {
//        el: "#image-container",
//        pinTemplateName: "PinTemplate.html",
//        pinTemplate: "",
//        pinLayer: null,
//        isSquare: false,
//        mousedown: null,
//        mousemove: null,
//        mouseup: null,
//        touchstart: null,
//        touchmove: null,
//        touchend: null,
//        color: "",
//        coors: {},
//        refreshTimer: null,
//        initTimer: null,
//        timer: null,
//        save: null,
//        pinNumber: 0,
//        model: model,
//        dotPinSize: {
//            width: 256,
//            height: 174,
//            number: {
//                width: 32,
//                height: 32,
//                offsetLeft: 30
//            }
//        },
//
//
//        initVars: function () {
//            this.refreshTimer = this.model.get("refreshTimer");
//            this.initTimer = this.model.get("initTimer");
//            this.timer = this.model.get("timer");
//            this.save = this.model.get("save");
//            this.color = this.model.get("color");
//            this.model.set("pin", this.pin);
//            if(this.model.get("tasks")) this.pinNumber = this.model.get("tasks").length;
//
//            this.mousedown = this.startPin;
//            this.mousemove= this.movePin;
//            this.mouseup= this.stopPin;
//            this.touchstart= this.startPin;
//            this.touchmove= this.movePin;
//            this.touchend= this.stopPin;
//        },
//
//        pin: function (coors, e) {
//            if (this[e.type]) this[e.type](coors);
//        },
//
//        startPin: function (coors) {
//            this.coors = coors;
//        },
//
//        movePin: function (coors) {
//            if (this.coors && (coors.x > this.coors.x + 40 || coors.x < this.coors.x - 40) && (coors.y > this.coors.y + 40 || coors.y < this.coors.y - 40)) {
//                this.isSquare = true;
//            }
//        },
//
//        stopPin: function (coors) {
//            this.refreshTimer();
//            var pin = $("<div></div>");
//            pin.addClass("pin");
//            pin = this.isSquare ? this.squarePin(pin, coors) : this.dotPin(pin, coors);
//            this.coors = null;
//            this.isSquare = false;
//            this.pinLayer.append(pin);
//        },
//
//        squarePin: function(pin, coors) {
//            pin.addClass("square-pin");
//            if (coors.x > this.coors.x) {
//                pin.css("left", this.coors.x)
//            } else {
//                pin.css("left", coors.x)
//            }
//            if (coors.y > this.coors.y) {
//                pin.css("top", this.coors.y)
//            } else {
//                pin.css("top", coors.y)
//            }
//            var width = Math.abs(this.coors.x - coors.x);
//            var height = Math.abs(this.coors.y - coors.y);
//            pin.css("width", width);
//            pin.css("height", height);
//
//            return pin;
//        },
//
//        dotPin: function(pin, coors) {
//            var containerPositionLeft = 0;
//            var containerPositionTop = 0;
//            var containerClass = "";
//            var __self = this;
//
//            if (coors.y + this.dotPinSize.height > this.pinLayer.height()) {
//                containerClass = "click-bottom-";
//                containerPositionTop = coors.y + (this.dotPinSize.number.height / 2) - this.dotPinSize.height;
//            } else {
//                containerClass = "click-";
//                containerPositionTop = coors.y - (this.dotPinSize.number.height / 2);
//            }
//            if (coors.x + this.dotPinSize.width > this.pinLayer.width()) {
//                containerClass += "right";
//                containerPositionLeft = coors.x + (this.dotPinSize.number.width / 2) + this.dotPinSize.number.offsetLeft - this.dotPinSize.width;
//            } else {
//                containerClass += "left";
//                containerPositionLeft = coors.x - (this.dotPinSize.number.width / 2) - this.dotPinSize.number.offsetLeft;
//            }
//
//
//            pin.addClass("dot-pin")
//                .addClass("main-click-message")
//                .addClass(containerClass)
//                .html(this.pinTemplate)
//                .css("left", containerPositionLeft)
//                .css("top", containerPositionTop)
//
//            pin.find(".message-number")
//                .text(String(++__self.pinNumber))
//                .click(function() {
//                    var parent = $(this).parent();
//                    var willExpanded = !__self.isExpanded(parent);
//                    __self.closeAll();
//                    if(willExpanded) __self.expand(parent);
//                    else __self.close(parent);
//                });
//
//            this.closeAll();
//            this.expand(pin);
//
//            if(this.model.get("pins")) {
//
//                var pinModel = new bm.PinModel({
//                    el: $(pin)
//                });
//                var pinView = new bm.DotPinView({model: pinModel});
//                this.model.get("pins").push({
//                    el: $(pin),
//                    model: pinModel,
//                    view: pinView
//                });
//            }
//
//            return pin;
//        },
//
//        expand: function(pin) {
//            pin.addClass("expand");
//        },
//
//        isExpanded: function(pin) {
//
//            return pin.hasClass("expand");
//        },
//
//        close: function(pin) {
//            pin.removeClass("expand");
//        },
//
//        closeAll: function() {
//            var __self = this;
//            $(".dot-pin").each(function(i,v) { __self.close($(v)) });
//        },
//
//        initialize: function () {
//            var __self = this;
//            if (__self.model) __self.initVars();
//            if (!__self.pinTemplate) {
//                $.when(bm.TemplateStore.get(__self.pinTemplateName)).then(function (template) {
//                    if (template) {
//                        __self.pinTemplate = _.template(template);
//                        __self.pinLayer = $(__self.el);
//                    }
//                });
//            }
//            return __self;
//        }
//    };
//};