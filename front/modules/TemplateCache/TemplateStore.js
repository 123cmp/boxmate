bm.TemplateStore = {
    __templates: {},

    add: function (key, template) {
        this.__templates[key] = template;
    },
    remove: function (key) {
        delete this.__templates[key];
    },
    get: function (key) {
        return this.__templates[key];
    }
};



