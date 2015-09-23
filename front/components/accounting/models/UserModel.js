/**
 * @module
 * @author 123cmp
 * @extends Backbone.Model
 * @description Model for user
 */
define(['abstract/SiModel', 'api'],
    function(SiModel, api) {
        return SiModel.extend({
            defaults: {
                id: 0,
                name: "",
                email: "",
                password: "",
                repeat: "",
                subscribe: false, //object
                projects: null, //array of ProjectModel
                tasks: null //array of TaskModel
            },

            save: function() {
                return api.addUser(this.toJSON())
            }
        })
    });




