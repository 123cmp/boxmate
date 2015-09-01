bm.ApiService = {
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
        //console.log(user);
        //return $.put("api/users/", JSON.stringify(user), null, 'application/json');

        return $.ajax({
            url: "api/users/",
            type: "PUT",
            contentType: 'application/json',
            dataType: "json",
            data: JSON.stringify(user)
        });

    },
    removeUser: function(id) {
        return $.delete("api/users/id");
    },
    getUserProjects: function() {
        return $.get("api/projects");
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
    },
    getValidation: function(key) {
        return $.get("api/validations/"+key);
    },
    authorize: function(model) {
        return $.ajax({
            url: "api/login/",
            type: "POST",
            contentType: 'application/json',
            dataType: "json",
            data: JSON.stringify(model)
        });
    }
};



