var l = require('lodash');
var React = require('react');

var {Link} = require('react-router');

module.exports = React.createClass({
  displayName: 'Error404Page',
  pageTitle: "Not Found",

  mixins: [
    require('../helpers/mixins/page_title'),
    require('../helpers/mixins/keys')
  ],

  render() {
    var k = this.getKeyHelper();

    // Function defined in server-side context to set HTTP status
    if (l.isFunction(this.props.setHTTPStatus)) {
      this.props.setHTTPStatus(404);
    }

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
