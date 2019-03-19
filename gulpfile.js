/*
  gulpfile.js
  ===========
  Rather than manage one giant configuration file responsible
  for creating multiple tasks, each task has been broken out into
  its own file in `/gulp`. Any files in that directory
  get automatically required below.
*/

const gulp = require('gulp');
const mocha = require('gulp-mocha');
const requireDir = require('require-dir');

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp', {recurse: true});

gulp.task('copy-govuk-modules', gulp.series(
  'copy-toolkit',
  'copy-template-assets',
  'copy-elements-sass',
  'copy-template'
));

gulp.task('generate-assets', gulp.series(
  'clean',
  'copy-govuk-modules',
  gulp.parallel(
    'sass',
    'sass-documentation',
    'copy-assets',
    'copy-documentation-assets'
  )
));

gulp.task('watch', gulp.parallel(
  'watch-sass',
  'watch-assets'
));

gulp.task('mocha', () => {
  return gulp.src(['test/**/*.js'], { read: false })
    .pipe(mocha({ reporter: 'spec' }))
    .once('error', () => {
      process.exit(1)
    })
    .once('end', () => {
      process.exit()
    })
});

gulp.task('test', gulp.series(
  'generate-assets',
  'mocha'
));

gulp.task('default', gulp.series(
  'generate-assets',
  gulp.parallel(
    'watch',
    'server'
  )
));
