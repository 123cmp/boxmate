/**
 * @module
 * @author 123cmp
 * @extends Backbone.Model
 * @description Model for project
 */
define(['../../../bower_components/backbone/backbone-min'],
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


