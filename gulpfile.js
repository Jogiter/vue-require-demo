var gulp = require('gulp'),
    cached = require('gulp-cached'),
    del = require('del'),
    path = require('path'),
    watch = require('gulp-watch'),
    jshint = require('gulp-jshint'),
    webpack = require('gulp-webpack'),
    beautify = require('gulp-beautify'),
    spritesmith = require('gulp.spritesmith'),
    gutil = require('gulp-util'), // debug tasks
    rev = require('gulp-rev'), // version control
    revReplace = require('gulp-rev-replace');
    connect = require('gulp-connect');



var config = {
    base: './', // 当前文件所在目录
    src: './resources/', // 所有开发资源目录
    dist: './dist/', // 开发环境生成的静态资源--dev版本
	html: './views/',
    splitting: './src/splitting/' // 静态资源版本号map
};

// 合成雪碧图
var spriteImgConfig = {
    src: {
        baby: ['./src/sprite/baby.jpg', './src/sprite/baby2.jpg'],
        ss: ['./src/sprite/avatar.jpg', './src/sprite/captain.jpg']
    },
    dist: path.resolve(__dirname, config.splitting, 'sprite'),
    option: { // [spritesmith的配置选项](https://github.com/twolfson/gulp.spritesmith)

    }
};


// base task
gulp.task('base', function() {
    // 格式化开发目录的js
    gulp.src([config.src + 'js/**/*.js'])
        .pipe(cached('beautify'))
        .pipe(beautify())
        .pipe(gulp.dest(config.src + 'js/'));

    // 格式化gulpfile.js
    gulp.src('gulpfile.js')
        .pipe(beautify())
        .pipe(gulp.dest('./'));

    // jshint
    gulp.src([config.src + '**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));

    console.log('============base task done!');
    return false;
});

// 合成sprite图片
gulp.task('sprite', function() {

    var spriteImgs = spriteImgConfig.src;
    for (var obj in spriteImgs) {
        var src = spriteImgs[obj],
            mime = 'png',
            i,
            length,
            option = {};

        var type = function(obj) {
            return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
        };

        if (type(src) === 'array') {
            for (i = 0, length = src.length; i < length; i++) {
                var item = src[i],
                    isJPEG = /\bjp(e)?g\b/gi.test(item.slice(item.lastIndexOf('.') + 1));
                if (isJPEG) {
                    mime = 'jpg';
                    break;
                }
            }
        } else if (type(src) === 'string') {
            mime = src.slice(src.lastIndexOf('.') + 1);
        } else {
            throw new Error('sprite src must be a string or an array');
        }

        option = {
            imgName: obj + '.' + mime,
            cssName: obj + '.css',
            padding: 10,
            algorithm: 'binary-tree' // default: binary-tree
        };
        Object.assign(option, spriteImgConfig.option);

        gulp.src(src)
            .pipe(cached('img-sprite'))
            .pipe(spritesmith(option))
            .pipe(gulp.dest(spriteImgConfig.dist));
    }
    return console.log('==========all img-sprite done!');
});

// imagemin
gulp.task('imagemin', ['sprite'], function() {
    return gulp.src([config.src + 'image/**/*'])
        .pipe(cached('imagemin'))
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(config.dist + 'image/'));
});

// less: 在开发目录生成css
gulp.task('less', ['base'], function() {
    return gulp.src(config.src + 'less/*.less')
        .pipe(gulpIgnore.exclude(config.src + 'dev/**'))
        .pipe(cached('less'))
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(gulp.dest(config.dist + 'css'));
});

// concat:js
gulp.task('concat', function() {
    return gulp.src([config.src + 'js/third/vue.js', config.src + 'js/third/vue-router.js', config.src + 'js/third/vue-resource.min.js'])
        .pipe(concat('v.js'))
        .pipe(gulp.dest(config.dist + 'js/'));
});

// copy files
gulp.task('copy', ['concat'], function() {
    gulp.src(config.src + 'font/**/*')
        .pipe(gulp.dest(config.dist + 'font/'));

    gulp.src(config.src + 'json/**/*')
        .pipe(gulp.dest(config.dist + 'json/'));

    gulp.src([config.src + 'js/**/*'])
        .pipe(gulpIgnore.exclude(config.src + 'js/third/vue*'))
        .pipe(gulp.dest(config.dist + 'js/'));

});

// 压缩js并添加版本号
gulp.task('rev-config', ['base'], function() {
    del(config.dist + 'config*.js');

    return gulp.src([config.src + 'js/config.js'])
        // .pipe(cached('config'))
        .pipe(rev())
        .pipe(gulp.dest(config.dist + 'js/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest(config.splitting + 'js'));
});

// revReplace
gulp.task('revConfig', ['rev-config'], function() {
    var js_manifest = gulp.src(config.splitting + 'js/rev-manifest.json');
    return gulp.src([config.src + 'app/**/*.html'])
        .pipe(cached('rev'))
        .pipe(revReplace({
            manifest: js_manifest
        }))
        .pipe(gulp.dest(config.dist + 'app/'));
});




// 压缩css并添加版本号
gulp.task('rev-css', ['less'], function() {
    return gulp.src([config.dist + 'css/*.css', config.dist + 'font/*.css'])
        .pipe(cached('revcss'))
        .pipe(cleancss())
        .pipe(rev())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(config.assets + 'css/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest(config.splitting + 'css'));
});


// 压缩js并添加版本号
gulp.task('rev-js', ['base'], function() {
    return gulp.src([config.src + '**/*.js'])
        .pipe(cached('revjs'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(config.assets))
        .pipe(rev.manifest())
        .pipe(gulp.dest(config.splitting + 'js'));
});

// revReplace
gulp.task('rev', ['rev-js', 'rev-css'], function() {
    var css_manifest = gulp.src(config.splitting + 'css/rev-manifest.json'),
        js_manifest = gulp.src(config.splitting + 'js/rev-manifest.json');
    return gulp.src([config.src + 'app/**/*.html'])
        .pipe(cached('rev'))
        .pipe(revReplace({
            manifest: css_manifest
        }))
        .pipe(revReplace({
            manifest: js_manifest
        }))
        .pipe(gulp.dest(config.assets + 'app/'));
});



// clean
gulp.task('clean', function(cb) {
    del([config.dist, config.splitting], cb);
});

gulp.task('reload', function() {
    return gulp.src(config.html + '/*.html')
        .pipe(connect.reload());
});

gulp.task('watch:res', function() {
    gulp.watch([config.src + '**/*', config.html + '**/*'], ['reload']);
})

gulp.task('connect', function() {
  connect.server({
	  root: ['views', './', 'json', 'resources'],
	  port: 8080,
	  host: 'localhost',
	  livereload: true
  });
});
// default
gulp.task('default', ['connect', 'watch:res']);