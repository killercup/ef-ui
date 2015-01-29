var React = require('react');
var {Route, DefaultRoute, NotFoundRoute} = require('react-router');

module.exports = (
  <Route name="index" path="/" handler={require('./components/_pages/_base')}>
    <DefaultRoute name="start"
      handler={require('./components/_pages/start')} />

    <Route name="register" path="/register"
      handler={require('./components/_pages/auth-register')} />
    <Route name="verify" path="/verify"
      handler={require('./components/_pages/auth-verify')} />
    <Route name="login" path="/login"
      handler={require('./components/_pages/auth-login')} />
    <Route name="logout" path="/logout"
      handler={require('./components/_pages/auth-logout')} />
    <Route name="profile" path="/profile"
      handler={require('./components/_pages/profile')} />

    <Route name="voting" path="/vote"
      handler={require('./components/_pages/voting')} />

    <Route name="shows" path="/shows"
      handler={require('./components/_pages/shows')} />
    <Route name="show" path="/shows/:id"
      handler={require('./components/_pages/show')} />
    <Route name="episode" path="/episodes/:id"
      handler={require('./components/_pages/episode')} />

    <NotFoundRoute
      handler={require('./components/_pages/error404')} />
  </Route>
);
