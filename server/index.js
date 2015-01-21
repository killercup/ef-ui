require('node-jsx').install({extension: '.jsx', harmony: true});

var path = require('path');
var express = require('express');
var gutil = require('gulp-util');
var renderReactApp = require('./render_react');

var STATIC_PATH = path.join(__dirname, '../build');
var TEMPLATE_PATH = path.join(STATIC_PATH, 'template.html');

var server = express();

server.use('/static', express.static(STATIC_PATH));

server.use(renderReactApp({
  routes: require('../src/routes'),
  template: TEMPLATE_PATH
}));

server.use(function (err, req, res, next) {
  gutil.log(gutil.colors.red("[ERROR]"), req.path);
  next(err);
});

var port = process.env.NODE_PORT || 3000;

if (process.env.NODE_ENV === 'test') {
  module.exports = server;
} else {
  server.listen(port, function () {
    gutil.log("Server listening at http://localhost:" + port + "/");
  });
}
