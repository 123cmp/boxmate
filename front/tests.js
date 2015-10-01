requirejs.config({
    baseUrl: "front/",
    paths: {
        "jquery" : "bower_components/jquery/dist/jquery.min",
        "jquery-ui" : "third-party/jquery-ui-1.11.4.custom/jquery-ui.min",
        "underscore" : "bower_components/underscore/underscore-min",
        "backbone" : "bower_components/backbone/backbone-min",
        "syphon" : "bower_components/backbone.syphon/lib/backbone.syphon.min",
        "text" : "bower_components/requirejs-text/text",
        "api" : "components/main/modules/ApiService",
        "jasmine" : "bower_components/jasmine-core/lib/jasmine-core/jasmine",
        "jasmine-html" : "bower_components/jasmine-core/lib/jasmine-core/jasmine-html",
        'jasmine-boot': 'bower_components/jasmine-core/lib/jasmine-core/boot'
    },

    shim: {
        "backbone" : ["jquery", "underscore"],

        'jasmine': {
            exports: 'jasmine'
        },

        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
        },

        'jasmine-boot': {
            deps: ['jasmine', 'jasmine-html'],
            exports: 'jasmine'
        }

    }
});

require(['underscore', 'jquery', 'jasmine-boot'], function(_, $){

    var specs = [];
    //'tests/models/AuthorizationModelSpec'
    //specs.push('spec/models/TodoSpec');
    //specs.push('spec/views/ClearCompletedSpec');
    //specs.push('spec/views/CountViewSpec');
    //specs.push('spec/views/FooterViewSpec');
    //specs.push('spec/views/MarkAllSpec');
    //specs.push('spec/views/NewTaskSpec');
    //specs.push('spec/views/TaskListSpec');
    //specs.push('spec/views/TaskViewSpec');
    $.each(specs, function(spec) {
        require([spec], function(){
            //trigger Jasmine
            window.onload();
        });
    })

});



//    var jasmineEnv = jasmine.getEnv();
//    jasmineEnv.updateInterval = 1000;
//
//    var htmlReporter = new jasmine.HtmlReporter();
//
//    jasmineEnv.addReporter(htmlReporter);
//
//    jasmineEnv.specFilter = function(spec) {
//        return htmlReporter.specFilter(spec);
//    };
//
//    var specs = [];
//
//    specs.push('spec/models/TodoSpec');
//    //specs.push('spec/views/ClearCompletedSpec');
//    //specs.push('spec/views/CountViewSpec');
//    //specs.push('spec/views/FooterViewSpec');
//    //specs.push('spec/views/MarkAllSpec');
//    //specs.push('spec/views/NewTaskSpec');
//    //specs.push('spec/views/TaskListSpec');
//    //specs.push('spec/views/TaskViewSpec');
//
//    $(function(){
//        require(specs, function(){
//            jasmineEnv.execute();
//        });
//    });
//
//});