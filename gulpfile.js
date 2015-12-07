var gulp = require( 'gulp' );
var uglify = require( 'gulp-uglify' );
var rename = require( 'gulp-rename' );
var jshint = require( 'gulp-jshint' );
var qunit = require( 'gulp-qunit');
var del = require('del');

var paths = {
    scripts: ['./src/**/*.js']
};

gulp.task('clean', function () {
    return del([
        'dist/*'
    ]);
});

gulp.task('lint', function(){
    return gulp.src(paths.scripts)
        .pipe( jshint() )  // lint out file
        .pipe( jshint.reporter( 'jshint-stylish' ) );  // output to stylish
});

gulp.task('test', function(){
    return gulp.src('./test/index.html')
        .pipe( qunit() );  // run tests
});

gulp.task('copy', function(){
    return gulp.src(paths.scripts)
        .pipe( gulp.dest( './dist/' ) );  // copy original to destination folder
});

gulp.task('minify', function(){
    return gulp.src(paths.scripts)
        .pipe( uglify() )  // minify the code
        .pipe( rename( { suffix: '.min' } )) //rename to .min
        .pipe( gulp.dest( './dist/' ) );  // copy renamed file to destination folder
});

gulp.task( 'watch', function() {
    gulp.watch( paths.scripts, ['default'] );
});


gulp.task('default', ['clean','lint', 'test', 'copy', 'minify']);
