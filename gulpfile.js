var gulp = require('gulp');
var babel = require('gulp-babel');
var mocha = require('gulp-spawn-mocha');


function swallowError (error) {
    console.error(error.message + "\n" + error.codeFrame);
    this.emit('end')
}

gulp.task('set-dev-node-env', function() {
    return process.env.NODE_ENV = 'development';
});

gulp.task('set-prod-node-env', function() {
    return process.env.NODE_ENV = 'production';
});

gulp.task('es6', function() {
    return gulp.src([
        'client/*.js', 'client/**/*.js', 'client/**/**/*.js'
    ])
        .pipe(babel({ plugins: ['transform-es2015-modules-amd', 'transform-inline-environment-variables', 'transform-react-jsx'] }))
        .on('error', swallowError)
        .pipe(gulp.dest('public/js'));
});

gulp.task('vendor', function() {
    gulp.src([
        'bower_components/react/react.min.js',
        'bower_components/react/react-dom.min.js',
        'lib/*'
    ]).pipe(gulp.dest('public/js/vendor'));
});

gulp.task('copy', function() {
    gulp.src([
        'client/views/templates/*.html'
    ], { base: 'client'  })
        .pipe(gulp.dest('public'));
    gulp.src('setup.js').pipe(gulp.dest('public/js'))
});

gulp.task('test', function () {
    require('babel-core/register');
    gulp.src(['test/unit/**/*.js'])
        .pipe(mocha({
            compilers: [ 'js:babel-register']
        })) //custom path to CasperJs
});

gulp.task('build-dev', ['set-dev-node-env','es6', 'vendor', 'copy']);

gulp.task('build', ['set-prod-node-env','es6', 'vendor', 'copy']);

gulp.task('default', ['build-dev', 'test'], function() {
    gulp.watch(['client/**/*.*'], ['build-dev', 'test']);
});
