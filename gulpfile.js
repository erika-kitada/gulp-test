var gulp            = require('gulp'); // gulpを読み込む
var uglify          = require('gulp-uglify'); // gulp-uglifyを読み込む
var iconfont        = require('gulp-iconfont');
var consolidate     = require('gulp-consolidate');

// 「uglify」タスクを定義する
gulp.task('uglify', function () {
  // タスクを実行するファイルを指定
  gulp.src('./src/js/test.js')
    // 実行する処理をpipeでつないでいく
    .pipe(uglify()) // uglifyを実行
    .pipe(gulp.dest('dist')) // 圧縮したファイルをdistに出力
});


/***************************************************************************
* アイコンフォント
***************************************************************************/
var runTimestamp = Math.round(Date.now()/1000);
gulp.task('iconfont', function(){

  return gulp.src(['dev/icons/*.svg']) // 【A】のパスを指定
    .pipe(iconfont({
      startUnicode: 0xF001,
      fontName: 'iconfont',
      formats: ['ttf', 'eot', 'woff', 'svg'],
      appendCodepoints:false,
      normalize: true,
      fontHeight: 500,
      timestamp: runTimestamp
    }))

   .on('glyphs', function(glyphs) {
      gulp.src('dev/icons/templates/iconfont.css') // 【B】のパスを指定
      .pipe(consolidate('lodash', {
        glyphs: glyphs.map(function(glyph) {
          return { fileName: glyph.name, codePoint: glyph.unicode[0].charCodeAt(0).toString(16).toUpperCase() };
        }),
        fontName: 'iconfont',
        fontPath: '../fonts/',
        cssClass: 'icon'
      }))
      .pipe(gulp.dest('dev/css/')); // 【D】のパスを指定
    })

    .pipe(gulp.dest('dev/fonts')); // 【C】のパスを指定
});
