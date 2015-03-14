var React = require('react');
var {Link, Navigation} = require('react-router');

var Auth = require('../../data/auth');

module.exports = React.createClass({
  displayName: 'StartPage',
  pageTitle: "Start",

  mixins: [
    Navigation,
    require('../../helpers/mixins/events'),
    require('../../helpers/mixins/page_title'),
    require('../../helpers/mixins/keys')
  ],

  events: {
    LOGGED_IN() { this.setState({}); },
    LOGGED_OUT() { this.transitionTo('logout'); }
  },

  render() {
    var k = this.getKeyHelper();

    if (Auth.exists()) {
      return (
        <section {...k('main')}>
          <p {...k('hello')}>
            Hello, {Auth.get('name')}!. You are logged in.
          </p>
          <p {...k('link')}>
            <button onClick={Auth.destroy}>
              Log out!
            </button>
          </p>
        </section>
      );
    }

    return (
      <section {...k('main')}>
        <p {...k('hello')}>
          Hello. You are <strong>not</strong> logged in.
        </p>
        <p key="login">
          <Link key="0" to="login">
            Login
          </Link>
        </p>
        <p key="register">
          <Link key="0" to="register">
            Register
          </Link>
        </p>
      </section>
    );
  }
});
