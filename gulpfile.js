var gulp = require("gulp"),
    watch = require("gulp-watch"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    browserSync = require("browser-sync"),
    nodemon = require("gulp-nodemon");


var input = "./public/scss/*.scss";
var output = "./public/css"

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};



gulp.task("sass", function() {
    return gulp.src(input)
        .pipe(sass(sassOptions).on("error", sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest(output))
});


gulp.task("default", ["watch"], function() {});


gulp.task("watch", ["browser-sync"], function() {

    watch("./public/scss/**/*.scss", function() {
        gulp.start("sass");
    });

    watch("./public/ts/*.ts", function() {
        gulp.start("typescript");
    });

});

gulp.task("browser-sync", ["nodemon"], function() {
    browserSync.init(null, {
        proxy: "http://localhost:5000",
        files: ["public/**/*.*", "views/*.*"],
        port: 7000,
        reloadDelay: 150,
    });
});

gulp.task("nodemon", function(cb) {

    var started = false;

    return nodemon({
        script: "app.js"
    }).on("start", function() {
        if (!started) {
            cb();
            started = true;
        }
    });
});