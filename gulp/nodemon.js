/*
  nodemon.js
  ===========
  uses nodemon to run a server, watches for javascript and json changes
*/

const fs = require('fs');
const path = require('path');

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

const config = require('./config.json');

gulp.task('server', () => {
  nodemon({
    script: 'server.js',
    ext: 'js, json',
    ignore: [config.paths.public + '*',
      config.paths.assets + '*',
      config.paths.nodeModules + '*']
  }).on('quit', () => {
    // remove .port.tmp if it exists
    try {
      fs.unlinkSync(path.join(__dirname, '/../.port.tmp'))
    } catch (e) {}

    process.exit(0);
  })
});
