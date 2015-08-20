bm.TemplateStore = {
    __templates: {},
    loader: null,
    add: function (key, template) {
        this.__templates[key] = template;
    },
    remove: function (key) {
        delete this.__templates[key];
    },
    get: function (key) {
        var __self = this;
        if(!__self.loader) __self.loader = new bm.TemplateLoader(__self);
        bm.spinnerModel.set({spin: true});
        bm.spinnerModel.trigger("change");
        if(__self.__templates[key])  {
            bm.spinnerModel.set({spin: false});
            bm.spinnerModel.trigger("change");
            return __self.__templates[key];
        } else {
            var promise = __self.loader.loadTemplate(key);
            $.when(promise).then(function() {
                bm.spinnerModel.set({spin: false});
                bm.spinnerModel.trigger("change");
            });
            return promise;
        }
    }
};



