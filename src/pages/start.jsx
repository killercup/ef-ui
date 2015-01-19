var React = require('react');
var {defaultKeyAndClass} = require('../helpers');

var {Link} = require('react-router');

var Auth = require('../data/auth');

module.exports = React.createClass({
  displayName: 'StartPage',

  getDefaultProps() {
    return {cssName: this.displayName};
  },

  render() {
    var k = defaultKeyAndClass(this.props.cssName);

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
