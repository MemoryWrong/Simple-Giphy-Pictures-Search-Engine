/**
 * CMD:
 * SASS --watch inputFile:outputFile
 * 'gulp' for scripts images css compile or compress
 * */

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
// var gulpCopy = require('gulp-copy');
var clean = require('gulp-clean');
var connect = require('gulp-connect');
var gulpWebpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var util = require('gulp-util');
var cssmin = require('gulp-minify-css');
var rename = require('gulp-rename');

var config = {
    assetsDir: './assets',
    sassPattern: './app/styles/**/*.scss',
    production: !!util.env.production
}

console.log(util.env.production);

var path = {
    HTML: 'index.html',
    SASS: 'app/styles',
};

gulp.task('clean', function () {
    return gulp.src(['assets', 'build', 'rev', 'dist'], {read: false})
        .pipe(clean());
});


gulp.task('server', function () {
    connect.server({
        port: 3000,
    });
});

/**
 * js
 * */
gulp.task('webpack', function () {
    gulp.src('./app/main.js')
        .pipe(plumber())
        .pipe(gulpWebpack(webpackConfig))
        .pipe(config.production? uglify():util.noop())
        .pipe(config.production? rename({suffix:'.min'}):util.noop())
        .pipe(gulp.dest('./assets/scripts/'));
        // .pipe(notify({message: 'JS Scripts task complete'}));

});
/***
 * styles
 * */
gulp.task('sass', function () {
    return gulp.src(path.SASS + '/**/*.scss')
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(config.production? cssmin():util.noop())
        .pipe(config.production? rename({suffix:'.min'}):util.noop())
        .pipe(gulp.dest('./assets/styles/'));
        // .pipe(notify({message: 'SASS task complete'}));

});
/**
 * images
 * */
gulp.task('images', function () {
    return gulp.src('./app/images/**/*')
        .pipe(config.production? cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})):util.noop())
        .pipe(gulp.dest('assets/images'))
        .pipe(notify({message: 'Images task complete'}));
});

/**
 * clean
 * */
gulp.task('clean', function () {
    return gulp.src(['./assets/styles', './assets/scripts', './assets/images', './dist/**/*'], {read: false})
        .pipe(clean())
        .pipe(notify({message:'clean complete'}));
});
/**
 * watch....
 * */
gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(['./app/main.js'], ['webpack']);
    gulp.watch([path.SASS + '/**/*.scss'], ['sass']);
    gulp.watch(['assets/**/*']).on('change', function (file) {
        livereload.changed(file.path)
    });
})
/**
 * 'gulp --production' cmd already added to the sub-tasks ....
 * **/
gulp.task('default', ['sass', 'images', 'webpack']);