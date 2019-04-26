var gulp = require("gulp"),
  fileinclude = require("gulp-file-include"),
  webserver = require("gulp-webserver"),
  rename = require("gulp-rename"),
  uglify = require("gulp-uglify"),
  babel = require("gulp-babel"),
  watch = require("gulp-watch"),
  concat = require("gulp-concat"),
  connect = require("gulp-connect");

// HTML
gulp.task("html-fileinclude", function() {
  return watch("./src/**/*.html", function() {
    gulp
      .src(["./src/html/*.html"])
      .pipe(
        fileinclude({
          prefix: "@@",
          basepath: "./src/_include",
          indent: true,
        }),
      )
      .pipe(gulp.dest("./"))
      .pipe(connect.reload());
  });
});

// JS
gulp.task("js-minify", function() {
  return watch("./src/js/*.js", function() {
    gulp
      .src(["./src/js/*.js"])
      .pipe(concat("index.js"))
      .pipe(
        babel({
          presets: ["@babel/env"],
        }),
      )
      .pipe(uglify())
      .pipe(
        rename(function(path) {
          path.basename += ".min";
          path.extname = ".js";
        }),
      )
      .pipe(gulp.dest("./dist/js"))
      .pipe(connect.reload());
  });
});

gulp.task("sass-watch", function() {
  return watch("./src/sass/**/*.sass", function() {
    gulp.src(["./src/sass/**/*.sass"]).pipe(connect.reload());
  });
});

gulp.task("webserver", function() {
  gulp.src("./").pipe(
    webserver({
      port: 3000,
      livereload: true,
      directoryListing: false,
      open: true,
      fallback: "index.html",
    }),
  );
});

gulp.task(
  "build",
  gulp.parallel("html-fileinclude", "js-minify", "sass-watch", "webserver"),
);
