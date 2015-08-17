var gulp = require('gulp');
var clean = require('gulp-clean');
var handlebars = require('gulp-ember-handlebars');
var concat = require('gulp-concat');
var emberTemplates = require('gulp-ember-templates');
var emberCompiler = require('/front/bower_components/bower/ember-template-compiler.js');
//gulp.task('clean', [], function() {
//    gulp.src(['public/tmp', 'public/final'], {read: false})
//        .pipe(clean());
//});
gulp.task('templates', function () {
    gulp.src('./front/templates/*.hbs')
        .pipe(emberTemplates({
            compiler: emberCompiler,
            isHTMLBars: true // Will generate `Ember.HTMLBars.template({ ... })`
        }))
        //.pipe(handlebars({
        //    outputType: 'browser'
        //}))
        .pipe(concat('ember-templates.js')) // make sure to only do concat after
        .pipe(gulp.dest('./front/templates'));
});


gulp.task('default', ['templates']);




