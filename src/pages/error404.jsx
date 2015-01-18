var l = require('lodash');
var React = require('react');
var {defaultKeyAndClass} = require('../_helpers');

var {Link} = require('react-router');

module.exports = React.createClass({
  displayName: 'Error404Page',

  getDefaultProps() {
    return {cssName: this.displayName};
  },

  render() {
    // Function defined in server-side context to set HTTP status
    if (l.isFunction(this.props.setHTTPStatus)) {
      this.props.setHTTPStatus(404);
    }

    var k = defaultKeyAndClass(this.props.cssName);

    return (
      <article {...k('main')}>
        <h1 {...k('headline')}>
          Not Found.
        </h1>
        <p {...k('description')}>
          <Link key={0} to="start">
            Back to the beginning.
          </Link>
        </p>
      </article>
    );
  }
});
