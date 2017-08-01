const conf = require('./gulp.conf');
const compress = require('compression');

module.exports = function () {
  return {
    server: {
      baseDir: [
        conf.paths.tmp,
        conf.paths.src
      ],
      middleware: [compress()]
    },
    open: false
  };
};
