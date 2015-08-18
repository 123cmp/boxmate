bm.StateView = Backbone.View.extend({
    el: $("#view"),
    auth: false,
    templates: {
        "home": "HomeTemplate.html", //_.template("<ul class='large-block-grid-3'><li></li><li class='text-center'><h1 id='hello'></h1></li><li></li></ul>"),
        "registration": "RegistrationTemplate.html",
        "authorization": "AuthorizationTemplate.html",
        "upload": "UploadTemplate.html", //_.template("<div id='upload-field'></div>"),
        "projects": "ProjectsTemplate.html" //_.template("<div id='projects'></div>")
    },

    views: {
        "home": ['HomeView'],
        "upload": ['UploadFieldView'],
        "projects": ['ProjectsView']
    },

    initialize: function () {
        var __self = this;
        var state = null;
        bm.stateModel.bind("change:state", function () {
            state = bm.stateModel.get("state");
            if(__self.checkAuth(state)) __self.render(state);
        });
        $.when(bm.loader.done()).then(function () {
            state = bm.stateModel.get("state");
            if(__self.checkAuth(state)) __self.render(state);
        });
        __self.render();
    },

    checkAuth: function(state) {
        var __self = this;
        if (!__self.auth && state != "registration") {
            bm.stateModel.set({state: "authorization"});
            Backbone.history.navigate('#!/authorization', true);
            bm.stateModel.trigger("change");
            __self.render(state);
            return false;
        }
        return true;
    },

    events: {},

    render: function (state) {
        console.log("state", state);
        var template = bm.TemplateStore.get(this.templates[state]);
        if (template) {
            template = _.template(template);
            $(this.el).html(template(bm.stateModel.toJSON()));
        } else {
            $(this.el).html("");
        }
        if (this.views[state]) {
            $.each(this.views[state], function (i, v) {
                if (!bm[v]) console.error("Ошибка при инжекте вьюхи (проверь index.html)");
                else new bm[v]().render();
            });
        }
        return this;
    }
});


