bm.ServiceApi = {
    getTemplates: function() {
        return $.get("/templates/")
    },
    getTemplate: function(name) {
        return $.get("/templates/"+name)
    },
    getUsers: function() {
        return $.get("/users/");
    },
    getUser: function(id) {
        return $.get("/users/"+id);
    },
    addUser: function(user) {
        return $.put("/users/", user);
    },
    removeUser: function(id) {
        return $.delete("/users/id");
    },
    getUserProjects: function(userId) {
        return $.get("/users/"+userId+"/projects/");
    },
    getProject: function(id) {
        return $.get("/projects/"+id);
    },
    addProject: function(project) {
        return $.put("/projects/", project);
    },
    removeProject: function(id) {
        return $.delete("/projects/"+id);
    },
    getProjectImages: function(projectId) {
        return $.get("/projects/"+projectId+"/images");
    },
    getImages: function(id) {
        return $.get("/images/"+id);
    },
    addImage: function(project) {
        return $.put("/projects/", project);
    },
    removeImage: function(id) {
        return $.delete("/projects/"+id);
    },

    getImageTasks: function(imageId) {
        return $.get("/images/"+imageId+"/tasks");
    },
    getTasks: function(id) {
        return $.get("/tasks/"+id);
    }




};



