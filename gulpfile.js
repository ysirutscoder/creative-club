

const gulp         = require('gulp'),
      sass         = require('gulp-sass'),
      pug          = require('gulp-pug'),
      browserSync  = require('browser-sync'),
      babel        = require('gulp-babel'),
      sourcemaps   = require('gulp-sourcemaps'),
      rename       = require('gulp-rename'),
      del          = require('del'),
      imagemin     = require('gulp-imagemin'),
      cache        = require('gulp-cache'),
      notify       = require('gulp-notify'),
      svgstore     = require('gulp-svgstore'),
      postcss      = require('gulp-postcss'),
      postcssPresetEnv = require('postcss-preset-env');

gulp.task('sass',  () => {
    return gulp.src(`./src/scss/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .on('error', notify.onError({
        title: 'sass',
        message: '<%= error.message %>'
    }))
    .pipe(
        sourcemaps.write({
            includeContent: false
        })
    )
    .pipe(
        sourcemaps.init({
            loadMaps: true
        })
    )
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(
        postcss([
            postcssPresetEnv({
                stage: 3,
                browsers: 'last 2 versions'
            })
        ])
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(`./dist/css`))
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task('pug',  () => {
    return gulp.src(`./src/templates/*.pug`,{ base: `./src/templates/` })
    .pipe(pug({
        pretty: true,
        basedir: `./src/pug/`,
    }))
    .on('error', notify.onError({
        title: 'PUG',
        message: '<%= error.message %>'
    }))
    .pipe(gulp.dest(`./dist`))
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task('scripts', () => {
    return gulp.src(`./src/js/*.js`)
    .pipe(babel())
    .pipe(gulp.dest(`./dist/js`))
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task('img', () => {
    return gulp.src(`./src/img/*`)
    .pipe(cache(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: false},
                {cleanupIDs: false}],
        })
    ])))
    .pipe(gulp.dest(`./dist/img`));
});





// Локальный сервер
gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: `./dist`
        },
        port: 3000,
        notify: false
    });
});


gulp.task('watch', ['browser-sync'], () => {
    // sass files
    gulp.watch([`./src/scss/**/*.scss`], ['sass']);
    // pug files
    gulp.watch([`./src/templates/*.pug`], ['pug']);
    // scripts
    gulp.watch([`./src/js/**/*.js`], ['scripts']);
    // images
    gulp.watch([`./src/img/**/*`], ['img']);
    // icons
});


gulp.task('clear', () => {
    return cache.clearAll();
});

gulp.task('build', [ 'sass', 'img',  'pug', 'scripts']);

gulp.task('default', ['build', 'watch']);
