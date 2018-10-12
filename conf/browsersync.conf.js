const conf = require('./gulp.conf');
const compress = require('compression');

const isHTTPS = Boolean(process.env.HTTPS);
const https = isHTTPS ? {
  key: `${process.env.HOME}/ssl/server.key`,
  cert: `${process.env.HOME}/ssl/server.crt`
} : false;

module.exports = function () {
  return {
    server: {
      baseDir: [
        conf.paths.tmp,
        conf.paths.src
      ],
      middleware: [compress()]
    },
    https,
    open: false,
    port: 3100
  };
};
