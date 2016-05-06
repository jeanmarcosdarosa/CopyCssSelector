//global require, __dirname
const fs = require("fs");
const gulp = require("gulp");
const crx = require("gulp-crx-pack");
const manifest = require("./src/manifest.json");
const Server = require("karma").Server;
const zip = require('gulp-zip');
const shell = require("gulp-shell");
const src = __dirname + "\\src";
gulp.task("crx", function () {
    return gulp.src("./src")
      .pipe(crx({
          privateKey: fs.readFileSync("./certs/key.pem", "utf8"),
          filename: manifest.name + ".crx"
      }))
      .pipe(gulp.dest("./build"));
});

gulp.task("zip", function(){
    return gulp.src("./src/**")
        .pipe(zip(manifest.name + ".zip"))
        .pipe(gulp.dest('./build'));
});

gulp.task("test", function (done) {
    new Server({
        configFile: __dirname + "/karma.conf.js",
        singleRun: true
    }, done).start();
});

gulp.task("chrome", shell.task(['"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe" --load-extension='+ src]));

gulp.task("default", ["test","zip","crx"]);