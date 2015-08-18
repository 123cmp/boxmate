bm.TemplateLoader = function(store) {
    var promises = [];
    var dfrd = $.Deferred();

    var getTemplate = function(v) {
        var deferred = $.Deferred();
        $.when($.get(v)).then(function(template) {
            var name = v.split("/");
            name = name[name.length - 1];
            store.add(name, template);
            deferred.resolve(template);
        });
        return deferred.promise();
    };
    $.when($.get("/templates")).then(function(data) {
        $.each(data, function(i,v) {
            promises.push(getTemplate(v));
        });
        $.when.apply($, promises).then(function() {
            dfrd.resolve("all done");
        });

    });

    return {
        done: function() {
            return dfrd.promise();
        }
    }
};



