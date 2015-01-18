var React = require('react');
var {defaultKeyAndClass} = require('../helpers');

module.exports = React.createClass({
  displayName: 'RegisterPage',
  pageTitle: 'Register',

  getDefaultProps() {
    return {cssName: this.displayName};
  },

  render() {
    var k = defaultKeyAndClass(this.props.cssName);

    return (
      <section {...k('main')}>
        <h1 {...k('headline')}>Register</h1>
        <form {...k('form')}>
          <p key="name"><input name="name" type="text"/></p>
          <p key="email"><input name="email" type="email"/></p>
          <p key="password"><input name="password" type="password"/></p>
          <p key="submit"><button type="submit">Submit</button></p>
        </form>
      </section>
    );
  }
});
