/**
 * @module
 * @author 123cmp
 * @extends Backbone.Model
 * @description Model for Piner module
 */
define(['../../../bower_components/backbone/backbone-min'],
    function(bb) {
        return bb.Model.extend({
            defaults: {
                color: "#FF0000",
                refreshTimer: function() {},
                initTimer: function() {},
                timer: function() {},
                save: function() {},
                pin: function() {},
                pins: []
            }
        })
    });


