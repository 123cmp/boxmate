/**
 * @module
 * @author 123cmp
 * @extends Backbone.Model
 * @description Model for error-message
 * @link Drawer
 */
define(['../../../bower_components/backbone/backbone-min'],
    function(bb) {
        return bb.Model.extend({
            defaults: {
                message: ""
            }
        })
    });