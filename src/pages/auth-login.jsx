var React = require('react');
var {defaultKeyAndClass} = require('../helpers');

module.exports = React.createClass({
  displayName: 'LoginPage',
  pageTitle: 'Login',

  getDefaultProps() {
    return {cssName: this.displayName};
  },

  render() {
    var k = defaultKeyAndClass(this.props.cssName);

    return (
      <section {...k('main')}>
        <h1 {...k('headline')}>Login</h1>
        <form {...k('form')}>
          <p key="email"><input name="email" type="email"/></p>
          <p key="password"><input name="password" type="password"/></p>
          <p key="submit"><button type="submit">Submit</button></p>
        </form>
      </section>
    );
  }
});
