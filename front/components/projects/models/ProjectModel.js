/**
 * @module
 * @author 123cmp
 * @extends Backbone.Model
 * @description Model for project
 */
define(['backbone'],
    function(bb) {
        return bb.Model.extend({
            defaults: {
                id: 0,
                name: "",
                options: null, //object
                users: null, //array of UserModel
                images: null, //array of ImageModel
                owner: null //ref to UserModel
            }
        })
    });

