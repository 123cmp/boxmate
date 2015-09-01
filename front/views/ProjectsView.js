bm.ProjectsView = Backbone.View.extend({
    el: "#projects",
    projects: [],
    projectViews: [],
    projectModels: [],

    initialize: function() {
        var __self = this;
        bm.ApiService.getUserProjects().then(function(answer) {
            if(!answer) return false;
            if(typeof answer === 'string') {
                try {
                    answer = JSON.parse(answer);
                } catch(e) {
                    console.error(answer);
                }
            }
            __self.project = answer;
            if(__self.project && __self.project.length > 0) {
                $.each(__self.project, function(i, project) {
                    var model = new bm.ProjectModel();
                    __self.projectModels.push(model);
                    __self.projectViews.push(new bm.ProjectView(model))
                });
            }
        })
    },

    render: function () {
        var __self = this;
        if(__self.project && __self.project.length > 0) {
            $.each(__self.project, function(i, project) {

            });
        }
    }
});


