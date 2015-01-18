var React = require('react');
var {Route, DefaultRoute, NotFoundRoute} = require('react-router');

module.exports = (
  <Route name="index" path="/" handler={require('./pages/_base')}>
    <DefaultRoute name="start"
      handler={require('./pages/start')} />

    <Route name="register" path="/register"
      handler={require('./pages/auth-register')} />
    <Route name="login" path="/login"
      handler={require('./pages/auth-login')} />
    <Route name="logout" path="/logout"
      handler={require('./pages/auth-logout')} />

    <Route name="shows" path="/shows"
      handler={require('./pages/shows')} />
    <Route name="show" path="/shows/:id"
      handler={require('./pages/show')} />
    <Route name="episode" path="/episodes/:id"
      handler={require('./pages/episode')} />

    <NotFoundRoute
      handler={require('./pages/error404')} />
  </Route>
);
