var React = require('react');

exports.dom = function (markup, options) {
  markup = markup || '<html><body></body></html>';
  options = options || {};

  if (typeof document !== "undefined" && document !== null) {
    return document;
  }

  var jsdom = require("jsdom").jsdom;
  global.document = jsdom(markup, options);

  global.window = global.document.parentWindow;
  return global.document;
};

exports.resetDom = function (done) {
  React.unmountComponentAtNode(document.body);
  document.body.innerHTML = "";
  return setTimeout(done);
};
