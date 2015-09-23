/**
 * @module
 * @author 123cmp
 * @abstract
 * @extends Backbone.Model
 * @description Backbone model with extended methods
 */

define(['backbone'], function(bb) {
    return new function() {
        return bb.Model.extend({
            push: function(arg, val) {
                var arr = _.clone(this.get(arg));
                arr.push(val);
                this.set(arg, arr);
            },

            each: function(callback) {
                var self = this;
                $.each(self.toJSON(), function(i, v) {
                    callback(i, self.get(i));
                })
            }
        });
    };
});