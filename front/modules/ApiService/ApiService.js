bm.ServiceApi = {
    getTemplates: function() {
        return $.get("api/templates/")
    },
    getTemplate: function(name) {
        return $.get("api/templates/"+name)
    },
    getUsers: function() {
        return $.get("api/users/");
    },
    getUser: function(id) {
        return $.get("api/users/"+id);
    },
    addUser: function(user) {
        return $.put("api/users/", user);
    },
    removeUser: function(id) {
        return $.delete("api/users/id");
    },
    getUserProjects: function(userId) {
        return $.get("api/users/"+userId+"/projects/");
    },
    getProject: function(id) {
        return $.get("api/projects/"+id);
    },
    addProject: function(project) {
        return $.put("api/projects/", project);
    },
    removeProject: function(id) {
        return $.delete("api/projects/"+id);
    },
    getProjectImages: function(projectId) {
        return $.get("api/projects/"+projectId+"/images");
    },
    getImage: function(id) {
        return $.get("api/images/"+id);
    },
    addImage: function(image) {
        return $.put("api/images/", image);
    },
    removeImage: function(id) {
        return $.delete("api/images/"+id);
    },
    getImageTasks: function(imageId) {
        return $.get("api/images/"+imageId+"/tasks");
    },
    getTask: function(id) {
        return $.get("api/tasks/"+id);
    },
    addTask: function(task) {
        return $.put("api/tasks/", task);
    },
    removeTask: function(id) {
        return $.delete("api/tasks/"+id);
    }
};



