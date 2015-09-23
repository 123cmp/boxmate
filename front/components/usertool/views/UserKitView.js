/**
 * @module Api
 * @author 123cmp
 * @extends Backbone.Model
 * @description Model for user
 */
define(['jquery', 'underscore'],
    function ($, _) {
        return Backbone.View.extend({
            el: ".main-list-instrument",

            events: {
                "click .bm-prev": "prev",
                "click .bm-next": "next",
                "click .bm-arrow": "selectionMode",
                "click .bm-pencil": "drawingMode",
                "click .bm-piner": "piningMode",
                "click .bm-image": "dosmt",
                "click .bm-eye": "clearMode"
            },

            selectionMode: function () {
                this.model.setMode.call(this.model.context, "selection");
            },

            drawingMode: function () {
                this.model.setMode.call(this.model.context, "drawing");
            },

            piningMode: function () {
                this.model.setMode.call(this.model.context, "pining");
            },

            clearMode: function () {
                this.model.setMode.call(this.model.context, "clear");
            },

            initialize: function () {

            },

            dosmt: function () {

            },

            prev: function () {

            },

            next: function () {

            }

        });
    });


