define(['../../../bower_components/backbone/backbone-min', 'text!templates/ProjectsTemplate.html', 'views/ProjectView', 'models/ProjectModel'],
    function (bb, template, ProjectView, ProjectModel) {
        return bb.View.extend({
            initialize: function () {
                var self = this;
                self.template = _.template(template);
                self.render();
                $.when(self.model.fetch()).then(function () {
                    self.createProjects();
                });
            },

            render: function () {
                if (this.template && this.$el) $(this.$el).html(this.template());
            },

            createProjects: function () {
                var projectsContainer = $(this.$el).find('.bm-projects-container');
                this.model.each(function (project) {
                    new ProjectView({model: project, el: projectsContainer})
                });
            }

        })
    }
);
//bm.ProjectsView = Backbone.View.extend({
//    el: "#projects",
//    projects: [],
//    projectViews: [],
//    projectModels: [],
//
//    initialize: function() {
//        var __self = this;
//        bm.ApiService.getUserProjects().then(function(answer) {
//            if(!answer) return false;
//            if(typeof answer === 'string') {
//                try {
//                    answer = JSON.parse(answer);
//                } catch(e) {
//                    console.error(answer);
//                }
//            }
//            __self.project = answer;
//            if(__self.project && __self.project.length > 0) {
//                $.each(__self.project, function(i, project) {
//                    var model = new bm.ProjectModel(project);
//                    __self.projectModels.push(model);
//                    __self.projectViews.push(new bm.ProjectView({model: model}))
//                });
//            }
//        })
//    },
//
//    render: function () {
//        var __self = this;
//        if(__self.project && __self.project.length > 0) {
//            $.each(__self.project, function(i, project) {
//
//            });
//        }
//    }
//});


