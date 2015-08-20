bm.TemplateLoader = function(store) {
    console.log(store);
    var getTemplateByName = function(name) {
        var deferred = $.Deferred();
        $.when(bm.ServiceApi.getTemplate(name)).then(function(data) {
            store.add(name, data);
            deferred.resolve(data);
        });
        return deferred.promise();
    };

    return {
        loadTemplate: function(name) {
            return getTemplateByName(name);
        }
    }
};



