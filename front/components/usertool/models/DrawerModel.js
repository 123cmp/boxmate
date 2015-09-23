/**
 * @module
 * @author 123cmp
 * @extends Backbone.Model
 * @description Model for Drawer module
 * @link Drawer
 */
define(['backbone'],
    function(bb) {
        return bb.Model.extend({
            defaults: {
                color: "#FF0000",
                refreshTimer: function() {},
                initTimer: function() {},
                timer: function() {},
                save: function() {},
                draw: function() {},
                context: null
            }
        })
    });