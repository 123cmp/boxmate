/**
 * @module
 * @author 123cmp
 * @extends Backbone.Model
 * @description Model for comment
 */
define(['backbone'],
    function(bb) {
        return bb.Model.extend({
            defaults: {
                date: null,
                text: "",
                owner: null //ref to UserModel
            }
        })
    });