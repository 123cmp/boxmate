bm.StateView = Backbone.View.extend({
    el: $("#view"),
    auth: true,
    templates: {
        "home": "HomeTemplate.html", //_.template("<ul class='large-block-grid-3'><li></li><li class='text-center'><h1 id='hello'></h1></li><li></li></ul>"),
        "registration": "RegistrationTemplate.html",
        "authorization": "AuthorizationTemplate.html",
        "upload": "UploadTemplate.html", //_.template("<div id='upload-field'></div>"),
        "projects": "ProjectsTemplate.html", //_.template("<div id='projects'></div>")
        "usertool": "UserToolTemplate.html", //_.template("<div id='projects'></div>")
        "addnewproject": "AddNewProjectTemplate.html" //_.template("<div id='projects'></div>")
    },

    views: {
        "home": ['HomeView'],
        "upload": ['UploadFieldView'],
        "authorization": ["AuthFormView"],
        "registration": ['RegistrationView'],
        "usertool": ["UserToolView"]
    },

    initialize: function () {
        var __self = this;
        var state = __self.model.get("state");
        __self.model.bind("change:state", function () {
            state = __self.model.get("state");
            __self.changeState(state)
        });
        __self.render(state);
    },

    changeState: function(state) {
        if(this.checkAuth(state)) this.render(state);
    },

    checkAuth: function(state) {
        var __self = this;
        if (!__self.auth && state != "registration") {
            __self.model.set({state: "authorization"});
            Backbone.history.navigate('#!/authorization', true);
            __self.model.trigger("change");
            __self.render("authorization");
            return false;
        }
        return true;
    },

    events: {},

    render: function (state) {
        var __self = this;
        if(!state) return;
        var templatePromise = bm.TemplateStore.get(__self.templates[state]);
        $.when(templatePromise).then(function(template) {
            template = _.template(template);
            $(__self.el).html(template(__self.model.toJSON()));
            if (__self.views[state]) {
                $.each(__self.views[state], function (i, v) {
                    if (!bm[v]) console.error("Ошибка при инжекте вьюхи (проверь index.html)");
                    else new bm[v]().render();
                });
            }
        });

        return __self;
    }
});


