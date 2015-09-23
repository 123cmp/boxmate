define(['jquery'],
    function ($) {
        return new function () {
            var self = this;
            self.onChange = null;
            self.pinLayer = null;

            self.changed = function () {
                if (self.onChange) self.onChange();
            };

            self.attach = function (element) {
                self.pinLayer = $(element);
                if (self.init) self.init();
                var canvas = null;
                if (element.nodeName == 'canvas') self.canvas = $(element);
                else self.canvas = $(element).find('canvas');
                self.context = self.canvas.get(0).getContext('2d');
                self.canvas.attr("width", self.canvas.width() + "px");
                self.canvas.attr("height", self.canvas.height() + "px");
                self.addEventListeners();
            };


            self.addEventListeners = function () {
                self.canvas.bind('mousedown', self.startDraw);
                self.canvas.bind('mousemove', self.moveDraw);
                self.canvas.bind('mouseup', self.stopDraw);
                self.canvas.bind('mouseleave', self.stopDraw);
                self.canvas.bind('touchstart', self.startDraw);
                self.canvas.bind('touchmove', self.moveDraw);
                self.canvas.bind('touchend', self.stopDraw);
            };

            self.calculateCoors = function (e) {
                var canvasPosition = self.canvas.offset();
                var coors = {
                    x: e.pageX - canvasPosition.left,
                    y: e.pageY - canvasPosition.top
                };
                if (!coors.x && !coors.y && e.targetTouches && e.targetTouches[0]) {
                    coors = {
                        x: e.targetTouches[0].offsetX, // - canvasPosition.left,
                        y: e.targetTouches[0].offsetY // - canvasPosition.top
                    }
                }
                return coors;
            };
            return self;
        };
    });