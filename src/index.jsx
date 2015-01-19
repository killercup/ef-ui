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
require('./data');

module.exports = router.run.bind(router);

if (process.env.BROWSER) {
  var perf = false;

  // kick of the rendering!
  router.run(function (Handler) {
    if (perf && process.env.NODE_ENV !== 'production') { React.addons.Perf.start(); }
    React.render(
      <Handler data={{id: 42}}/>,
      document.getElementById('container')
    );
    if (perf && process.env.NODE_ENV !== 'production') {
      if (perf) { clearInterval(perf); }
      perf = setInterval(() => {
        React.addons.Perf.stop();
        React.addons.Perf.printWasted();
        React.addons.Perf.start();
      }, 5000);
    }
  });
}
