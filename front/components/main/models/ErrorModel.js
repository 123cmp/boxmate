/**
 * @module
 * @author 123cmp
 * @extends Backbone.Model
 * @description Model for error-message
 * @link Drawer
 */
define(['backbone'],
    function(bb) {
        return bb.Model.extend({
            defaults: {
                message: ""
            }
        })
    });