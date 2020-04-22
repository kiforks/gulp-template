var gulp = require("gulp"),
    postcss = require("gulp-postcss"),
    posthtml = require("gulp-posthtml"),
    autoprefixer = require("autoprefixer"),
    htmlmin = require('gulp-htmlmin'),
    htmlValidator = require('gulp-w3c-html-validator'),
    plumber = require("gulp-plumber"),
    sass = require("gulp-sass"),
    include = require('posthtml-include'),
    minify = require("gulp-csso"),
    rename = require("gulp-rename"),
    tiny = require('gulp-tinypng-nokey'),
    webp = require('gulp-webp'),
    imagemin = require("gulp-imagemin"),
    svgstore = require('gulp-svgstore'),
    del = require('del'),
    browserSync = require('browser-sync').create(),
    gulpStylelint = require('gulp-stylelint'),
    concat = require('gulp-concat'),
    terser = require('gulp-terser'),
    gulpPngquant = require('gulp-pngquant');

// SCSS/CSS
gulp.task("style", async function () {
    gulp.src("src/sass/style.scss")
        .pipe(plumber())
        .pipe(gulpStylelint({
            failAfterError: false,
            reporters: [
                {
                    formatter: 'string',
                    console: true
                }
            ]
        }))
        .pipe(sass())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(gulp.dest("build/css"))
        .pipe(minify())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("build/css"))
        .pipe(browserSync.stream());
});


// Images
gulp.task("imagemin", function () {
    return gulp.src("src/img/**/*.{jpg,svg}")
      .pipe(imagemin([
          imagemin.gifsicle({interlaced: true}),
          imagemin.mozjpeg({progressive: true}),
          imagemin.svgo()
      ]))

      .pipe(gulp.dest("src/img"));
});

gulp.task('pngquant', async function() {
  gulp.src('src/img/**/*.png')
    .pipe(gulpPngquant({
      quality: '65-80'
    }))
    .pipe(gulp.dest('src/img'));
});

gulp.task('imgx1', async function () {
    gulp.src('src/img/_src/**/*@1x.{png,jpg,webp}')
        .pipe(gulp.dest('src/img/@1x/'));
});

gulp.task('imgx2', async function () {
    gulp.src('src/img/_src/**/*@2x.{png,jpg,webp}')
        .pipe(gulp.dest('src/img/@2x/'));
});

gulp.task('imgx3', async function () {
  gulp.src('src/img/_src/**/*@3x.{png,jpg,webp}')
    .pipe(gulp.dest('src/img/@3x/'));
});

gulp.task("clean-images", function () {
    return del("src/img/@*");
});

gulp.task('webp', () =>
    gulp.src('src/img/**/*.{png,jpg}')
        .pipe(webp())
        .pipe(gulp.dest('src/img'))
);

gulp.task("sprite", function () {
    return gulp.src("src/img/svg/**/icon-*.svg")
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename("sprite.svg"))
        .pipe(gulp.dest("build/img/svg/"));
});

gulp.task("copy-images-build", function () {
    return gulp.src("src/img/@*/**/*",
      {   base: "src"})
      .pipe(gulp.dest("build/"));
});

gulp.task("clean-images-build", function () {
    return del("build/img/@*");
});

gulp.task("copy-svg", function () {
    return gulp.src(
        ["src/img/svg/**/*",
            "!src/img/svg/**/icon-*.svg"], {
            base: "src"
        })
        .pipe(gulp.dest("build/"));
});

gulp.task("clean-svg", function () {
    return del("build/img/svg/**/*");
});

gulp.task("sort-images", gulp.series("clean-images","webp","imgx1","imgx2"));
gulp.task("build-images", gulp.series("clean-images-build", "copy-images-build"));
gulp.task("build-svg", gulp.series("clean-svg", "sprite", "copy-svg"));
gulp.task("image-compress", gulp.parallel("imagemin","pngquant"));
gulp.task("images", gulp.series("clean-images","webp","imgx1","imgx2","sprite","image-compress"));


// HTML
gulp.task("html", function () {
    return gulp.src("src/*.html")
        .pipe(plumber())
        .pipe(posthtml([
            include()
        ]))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("build"))
        .pipe(browserSync.stream());
});

gulp.task("validate-html", function () {
    return gulp.src("src/*.html")
        .pipe(htmlValidator())
        .pipe(htmlValidator.reporter());
});

gulp.task("validate", gulp.series("html", "validate-html"));


// Server
gulp.task("serve", () => {
    browserSync.init({
        port: 4000,
        server: "build",
        notify: true
    });
    gulp.watch("src/sass/**/*.scss", gulp.parallel('style'));
    gulp.watch("src/*.html", gulp.parallel('html')).on("change", browserSync.reload);
    gulp.watch("src/js/**/*.js", gulp.parallel('js')).on("change", browserSync.reload);
    gulp.watch("src/img/_src/**/*.{png,jpg}", gulp.parallel('sort-images')).on("change", browserSync.reload);
    gulp.watch("src/img/**/*.{png,jpg}", gulp.parallel("build-images")).on("change", browserSync.reload);
    gulp.watch("src/img/svg/**/*.svg", gulp.series('build-svg')).on("change", browserSync.reload);
});


// JS
gulp.task('js', function() {
    return gulp.src('src/**/*.js')
        .pipe(terser())
        .pipe(concat('index.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(browserSync.stream());
});


// COPY/DEL
gulp.task("copy", function () {
    return gulp.src([
        "src/fonts/**/*.{woff,woff2}",
        "src/img/@*/**/*",
        "src/img/svg/**/*",
        "!src/img/svg/**/icon-*.svg"], {
        base: "src"
    })
        .pipe(gulp.dest("build"));
});


gulp.task("clean", function () {
    return del("build");
});

gulp.task("git-clean", function () {
  return del("src/**/.gitkeep");
});



// Build
gulp.task("build", gulp.series("clean","copy","sprite", "style", "js", "html"));





