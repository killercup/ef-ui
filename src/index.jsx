var React = require('react');
var Router = require('react-router');
var routes = require('./routes');

if (process.env.BROWSER) { require('./style/index.less'); }

var router = Router.create({
  routes: routes,
  location: (process.env.NODE_ENV === 'production' || !process.env.BROWSER) ?
    Router.HistoryLocation :
    Router.HashLocation
});

// Require Stores and Event Handlers
require('./data');

module.exports = router.run.bind(router);

if (process.env.BROWSER) {
  // kick of the rendering!
  router.run(function (Handler) {
    React.render(
      <Handler data={{id: 42}}/>,
      document.getElementById('container')
    );
  });
}
