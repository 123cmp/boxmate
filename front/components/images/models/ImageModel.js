/**
 * @module
 * @author 123cmp
 * @extends Backbone.Model
 * @description Model for image
 */
define(['backbone'],
    function(bb) {
        return bb.Model.extend({
            defaults: {
                id: 0,
                name: "",
                path: "",
                project: null, //ref to UserModel
                tasks: null, //array of TaskModel
                owner: null //ref to UserModel
            }
        })
    });
