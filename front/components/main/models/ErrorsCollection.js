/**
 * @module
 * @author 123cmp
 * @extends Backbone.Model
 * @description Collection for all projects
 */
define(['backbone', 'api', 'components/main/models/ErrorModel'],
    function(bb, api, ErrorModel) {
        return bb.Collection.extend({
            model: ErrorModel,
            getErrorsByField: function(field) {
                var ans = this.filter(function(error) {return error.get('field') == field });
                console.log(ans);
                return ans;
            }
        })
    });


