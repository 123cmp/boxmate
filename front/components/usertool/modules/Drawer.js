define(['jquery', 'abstract/CanvasProcessor'],
    function ($, CanvasProcessor) {
        return new function () {
            var self = null;
            self = $.extend(CanvasProcessor, this);

            self.init = function () {
                self.isDrawing = false;
                self.color = "#FF0000";
                self.switchedOn = false;
            };

            self.startDraw = function (e) {
                var coors = self.calculateCoors(e);
                if (self.context && self.switchedOn) {
                    self.context.beginPath();
                    self.context.moveTo(coors.x, coors.y);
                    self.isDrawing = true;
                }
            };

            self.moveDraw = function (e) {
                var coors = self.calculateCoors(e);
                if (self.context && self.isDrawing && self.switchedOn) {
                    self.changed();
                    self.context.strokeStyle = self.color;
                    console.log("draw", coors);
                    self.context.lineJoin = "round";
                    self.context.lineWidth = 3;
                    self.context.lineTo(coors.x, coors.y);
                    self.context.stroke();
                }
            };

            self.stopDraw = function (e) {
                var coors = self.calculateCoors(e);
                if (self.context && self.isDrawing && self.switchedOn) {
                    self.changed();
                    self.moveDraw(coors);
                    self.isDrawing = false;
                }
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
