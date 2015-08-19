bm.TemplateStore = {
    __templates: {},

    add: function (key, template) {
        this.__templates[key] = template;
    },
    remove: function (key) {
        delete this.__templates[key];
    },
    get: function (key) {
        if(this.__templates[key])  {
            return this.__templates[key];
        } else {
            var promise = bm.loader.loadTemplate(key);
            return promise;
        }
    }
};



