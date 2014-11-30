var gutil = require('gulp-util');
var React = require('react');
var Router = require('react-router');

module.exports = function renderReactApp(opts) {
  var render = (function () {
    var template = require('fs').readFileSync(opts.template);
    return l.template(template, null, variabled: 'data');
  }());

  return function renderReactApp(req, res, next) {
    function setHTTPStatus(code) {
      if (code) { res.status(code); }
    }

    try {
      Router.run(appRoutes, req.path, function (Handler) {
        var html = React.renderToString(
          <Handler setHTTPStatus={setHTTPStatus}/>
        );
        res.send(render({data: {html: html}}));
      });
    } catch (error) {
      return next(error);
    }

    var statusCodeColor = res.statusCode === 200 ? 'green' : 'red';
    gutil.log(
      gutil.colors[statusCodeColor]("[#{res.statusCode}]"),
      "GET", req.path
    );
  }
};
