const conf = require('./gulp.conf');
const compress = require('compression');

module.exports = function () {
  return {
    server: {
      baseDir: [
        conf.paths.dist
      ],
      middleware: [compress()]
    },
    open: false
  };
};
