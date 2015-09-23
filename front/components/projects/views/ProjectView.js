define(['../../../bower_components/backbone/backbone-min', 'text!templates/ProjectTemplate.html'],
    function(bb, template) {
        return bb.View.extend({
            initialize: function() {
                this.template = _.template(template);
                this.render();
            },

            render: function () {
                var self = this;
                if(self.template && self.$el) {
                    $(self.$el).append(self.template({model: self.model.toJSON()}));
                }
            }
        })
    }
);
//
//
//bm.ProjectView = Backbone.View.extend({
//    parentEl: ".bm-projects-container",
//    el: null,
//    templateName: "ProjectTemplate.html",
//    template: null,
//
//    initialize: function() {
//        this.render();
//    },
//
//    compile: function() {
//        var __self = this;
//        if(__self.el) {
//            $(__self.el).find(".bm-project-title")
//                .text(__self.model.get("name"))
//                .attr("href", "#!/projects/"+__self.model.get("_id"))
//                .end();
//            var userBlock = $(__self.el).find(".bm-project-users");
//            if(__self.model.get("users") && __self.model.get("users").length > 0) $.each(__self.model.get("users"), function(i, user) {
//                userBlock.append("<li><a href='#'><i class='fa fa-user'></i></a></li>");
//            });
//            if(__self.model.get("images") && __self.model.get("images").length > 0) {
//                $(".bm-project-image").attr("src", __self.model.get("image"))
//            }
//
//
//        }
//    },
//
//    render: function () {
//        var __self = this;
//        if (__self.template) {
//            __self.el = $(__self.template());
//            $(__self.parentEl).append(__self.el);
//            __self.compile();
//        } else {
//            $.when(bm.TemplateStore.get(__self.templateName)).then(function (template) {
//                if (template) {
//                    __self.template = _.template(template);
//                    __self.render();
//                }
//            });
//        }
//    }
//});


