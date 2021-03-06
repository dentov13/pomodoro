var gulp = require('gulp'),
    babel = require("gulp-babel"),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
  return gulp.src('app/sass/**/*.sass')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer(['last 15 versions', '>1%', 'ie 8'], { cascade: true }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
  });

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task("scripts", function () {
  return gulp.src("app/js/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("app/js"));
});

gulp.task('watch', ['browser-sync', 'sass', 'scripts'], function() {
  gulp.watch(['app/sass/**/*.sass'], ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('default', ['watch']);
