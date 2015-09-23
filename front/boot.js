requirejs.config({
    baseUrl: "front/",
    paths: {
        "app": "app",
        "jquery" : "bower_components/jquery/dist/jquery.min",
        "jquery-ui" : "third-party/jquery-ui-1.11.4.custom/jquery-ui.min",
        "underscore" : "bower_components/underscore/underscore-min",
        "backbone" : "bower_components/backbone/backbone-min",
        "foundation" : "bower_components/foundation/js/foundation.min",
        "syphon" : "bower_components/backbone.syphon/lib/backbone.syphon.min",
        "text" : "bower_components/requirejs-text/text",
        "api" : "components/main/modules/ApiService"
    },

    shim: {
       "backbone" : ["jquery", "underscore"]
    }
});

requirejs(['app'], function(app) {
   app.start();
});