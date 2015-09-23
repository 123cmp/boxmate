/**
 * @module
 * @author 123cmp
 * @extends Backbone.Model
 * @description Collection for all projects
 */
define(['backbone', 'api', 'components/projects/models/ProjectModel'],
    function(bb, api, ProjectModel) {
        return bb.Collection.extend({
            fetch: function() {
                var self = this;
                var promise = api.getUserProjects();
                promise.then(function(result) {
                    self.reset(result);
                });
                console.log(self);
                return promise;
            },

            model: ProjectModel
        })
    });


