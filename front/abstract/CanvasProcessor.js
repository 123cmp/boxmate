define(['jquery'],
    function ($) {
        return function () {
            return {
                onChange: null,

                changed: function () {
                    if (this.onChange) this.onChange();
                },

                attach: function (element) {
                    if (this.init) this.init();
                    var canvas = null;
                    if (element.nodeName == 'canvas') this.canvas = $(element);
                    else this.canvas = $(element).find('canvas');
                    this.context = this.canvas.get(0).getContext('2d');
                    this.canvas.attr("width", this.canvas.width() + "px");
                    this.canvas.attr("height", this.canvas.height() + "px");
                    this.addEventListeners();
                },


                addEventListeners: function () {
                    this.canvas.bind('mousedown', this.startDraw);
                    this.canvas.bind('mousemove', this.moveDraw);
                    this.canvas.bind('mouseup', this.stopDraw);
                    this.canvas.bind('mouseleave', this.stopDraw);
                    this.canvas.bind('touchstart', this.startDraw);
                    this.canvas.bind('touchmove', this.moveDraw);
                    this.canvas.bind('touchend', this.stopDraw);
                },

                calculateCoors: function (e) {
                    var canvasPosition = this.canvas.offset();
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
                }

            };
        };
    });