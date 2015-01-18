var React = require('react');
var {defaultKeyAndClass} = require('../helpers');

var Router = require('react-router');

module.exports = React.createClass({
  displayName: 'ShowPage',
  mixins: [Router.State],

  getDefaultProps() {
    return {cssName: this.displayName};
  },

  render() {
    var k = defaultKeyAndClass(this.props.cssName);

    return (
      <article {...k('main')}>
        <h1 {...k('headline')}>
          Show ID #{this.getParams().id}
        </h1>
      </article>
    );
  }
});
