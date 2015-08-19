bm.TemplateLoader = function(store) {
    //var promises = [];
    //var dfrd = $.Deferred();

    //var getTemplate = function(v) {
    //    var deferred = $.Deferred();
    //    $.when($.get(v)).then(function(template) {
    //        var name = v.split("/");
    //        name = name[name.length - 1];
    //        store.add(name, template);
    //        deferred.resolve(template);
    //    });
    //    return deferred.promise();
    //};

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
        //loadAll: function () {
        //    $.when($.get("/templates")).then(function(data) {
        //        $.each(data, function(i,v) {
        //            promises.push(getTemplate(v));
        //        });
        //        $.when.apply($, promises).then(function() {
        //            dfrd.resolve("all done");
        //        });
        //
        //    });
        //
        //    return dfrd.promise();
        //},

        //done: function() {
        //    return dfrd.promise();
        //}
    }
};



