const gulp = require("gulp");
const plumber = require("gulp-plumber");
const srcmap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();

// Styles

const styles = () => {
    return gulp.src("src/less/style.less")
        .pipe(plumber())
        .pipe(srcmap.init())
        .pipe(less())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(srcmap.write("."))
        .pipe(gulp.dest("src/css"))
        .pipe(sync.stream());
}

exports.styles = styles;

// Server

const server = (done) => {
    sync.init({
        server: {
            baseDir: 'src'
        },
        cors: true,
        notify: false,
        ui: false,
    });
    done();
}

exports.server = server;

// Watcher

const watcher = () => {
    gulp.watch("src/less/**/*.less", gulp.series("styles"));
    gulp.watch("src/*.html").on("change", sync.reload);
}

exports.default = gulp.series(
    styles, server, watcher
);