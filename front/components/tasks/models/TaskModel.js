/**
 * @module
 * @author 123cmp
 * @extends Backbone.Model
 * @description Model for task
 */
define(['backbone'],
    function(bb) {
        return bb.Model.extend({
            defaults: {
                id: 0,
                title: "",
                description: "",
                wrapper: null, // obj coordinates and size of wrapper
                image: null, //ref to ImageModel
                owner: null //ref to UserModel
            }
        })
    });




