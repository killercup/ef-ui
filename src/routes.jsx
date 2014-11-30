var React = require('react');
var {Route, DefaultRoute, NotFoundRoute} = require('react-router');

module.exports = (
  <Route name="index" path="/" handler={require('./pages/_base')}>
    <DefaultRoute name="start"
      handler={require('./pages/start')} />
    <Route name="shows" path="/shows"
      handler={require('./pages/shows')} />
    <Route name="episode" path="/episodes/:id"
      handler={require('./pages/episode')} />
    <NotFoundRoute
      handler={require('./pages/error404')} />
  </Route>
);
