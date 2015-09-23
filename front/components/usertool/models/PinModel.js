/**
 * @module
 * @author 123cmp
 * @extends Backbone.Model
 * @description Model for Pin
 */
define(['backbone'],
    function(bb) {
        return bb.Model.extend({
            defaults: {
                comments: []
            }
        })
    });
