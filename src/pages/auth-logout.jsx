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
        <h1 {...k('headline')}>Bye!</h1>
      </section>
    );
  }
});
