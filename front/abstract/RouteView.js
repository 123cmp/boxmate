/**
 * @module
 * @author 123cmp
 * @abstract
 * @extends Backbone.View
 * @description View for every page loading by router
 */

define(['../../../bower_components/jquery/dist/jquery.min', '../bower_components/backbone/backbone-min'], function($, bb) {
    return new function() {
        return bb.View.extend({
            el: $("#view"),

            run: function() {
                if(this.loadTemplate) this.loadTemplate();
                this.render();
                if(this.loadViews) this.loadViews();
            },

            render: function () {
                if(this.template) $(this.el).html(this.template());
            }
        });
    };
});



