/**
 * @module
 * @author 123cmp
 * @extends Backbone.Model
 * @description Model for preloader
 */
define(['backbone'],
    function(bb) {
        return bb.Model.extend({
            defaults: {
                spin: false
            }
        })
    });



