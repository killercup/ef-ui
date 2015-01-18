var React = require('react');
var {defaultKeyAndClass} = require('../helpers');

var {Link} = require('react-router');

module.exports = React.createClass({
  displayName: 'StartPage',

  getDefaultProps() {
    return {cssName: this.displayName};
  },

  render() {
    var k = defaultKeyAndClass(this.props.cssName);

    return (
      <article {...k('main')}>
        <p {...k('description')}>
          Hello.
          <Link key="0" to="episode" params={{id: 2}}>
            Episode!
          </Link>
        </p>
      </article>
    );
  }
});
