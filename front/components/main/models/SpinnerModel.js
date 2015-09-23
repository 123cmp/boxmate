/**
 * @module
 * @author 123cmp
 * @extends Backbone.Model
 * @description Model for preloader
 */
define(['../../../bower_components/backbone/backbone-min'],
    function(bb) {
        return bb.Model.extend({
            defaults: {
                spin: false
            }
        })
    });



