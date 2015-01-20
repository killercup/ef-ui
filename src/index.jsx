var React = require('react/addons');
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
var Data = require('./data');

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

// Measure Performance
if (process.env.BROWSER && process.env.NODE_ENV !== 'production') {
  React.addons.Perf.start();
  Data.events.debounce(500).onValue(function () {
    React.addons.Perf.stop();
    React.addons.Perf.printExclusive();
    React.addons.Perf.printWasted();
    React.addons.Perf.start();
  });
}
