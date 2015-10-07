/**
 * @module
 * @author 123cmp
 * @extends Backbone.Model
 * @description Model for project
 */
define(['backbone', 'api'],
    function(bb, api) {
        return bb.Model.extend({
            defaults: {
                id: 0,
                name: "",
                options: null, //object
                users: null, //array of UserModel
                images: null, //array of ImageModel
                owner: null //ref to UserModel
            },
            fetch: function() {
                var self = this;
                if(!_.isUndefined(this.get('id'))) {
                    var promise = api.getProject(this.get('id'));
                    promise.then(function(res) {
                        self.set(res);
                    });
                    return promise;
                }
            }
        })
    });


