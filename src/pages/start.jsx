var React = require('react');
var {Link} = require('react-router');

var Auth = require('../data/auth');

module.exports = React.createClass({
  displayName: 'StartPage',
  pageTitle: "Start",
  mixins: [
    require('../helpers/mixins/events'),
    require('../helpers/mixins/page_title'),
    require('../helpers/mixins/keys')
  ],

  events: {
    LOGGED_IN() { this.setState({}); },
    LOGGED_OUT() { this.setState({}); }
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
            <Link key="0" to="episode" params={{id: 2}}>
              Episode!
            </Link>
          </p>
        </section>
      );
    } else {
      return (
        <section {...k('main')}>
          <p {...k('hello')}>
            Hello. You are <strong>not</strong> logged in.
          </p>
          <p>
            <Link key="0" to="login">
              Login
            </Link>
          </p>
        </section>
      );
    }
  }
});
