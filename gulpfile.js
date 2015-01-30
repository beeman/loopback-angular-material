var gulp = require('gulp');
var concat = require('gulp-concat');
var connect = require('gulp-connect');

var paths = {
  css: ['./client/app/css/**/*.css'],
  js: ['./client/app//js/**/*.js'],
  html: ['./client/app/index.html', './www/templates/**/*.html']
};

gulp.task('js', function(done) {
  gulp.src(paths.js)
    .pipe(connect.reload())
    .on('end', done);
});

gulp.task('css', function(done) {
  gulp.src(paths.css)
    .pipe(connect.reload())
    .on('end', done);
});

gulp.task('html', function(done) {
  gulp.src(paths.html)
    .pipe(connect.reload())
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.html, ['html']);
});

gulp.task('default', ['watch', 'server']);

gulp.task('server', function(){
  connect.server({
    root: ['client/app'],
    port: 9000,
    livereload: true,
    middleware: function(connect, o) {
      return [ (function() {
        var url = require('url');
        var proxy = require('proxy-middleware');
        var options = url.parse('http://0.0.0.0:3000/api');
        options.route = '/api';
        return proxy(options);
      })() ];
    }
  });
});
