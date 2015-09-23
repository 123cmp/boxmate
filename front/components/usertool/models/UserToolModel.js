/**
 * @module
 * @author 123cmp
 * @extends Backbone.Model
 * @description Model for UserTool page
 */
define(['backbone'],
    function(bb) {
        return bb.Model.extend({
            defaults: {
                image: "/front/assets/font-centre-block.jpg",
                mode: "selection"
            }
        })
    });
