/*
  clean.js
  ===========
  removes folders:
    - public
    - govuk_modules
*/

const del = require('del');
const gulp = require('gulp');

const config = require('./config.json');

gulp.task('clean', (done) => {
  return del([config.paths.public + '/*',
    config.paths.govukModules + '/*',
    '.port.tmp']);
});
