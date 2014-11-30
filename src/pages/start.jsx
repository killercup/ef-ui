var React = require('react');
var {defaultKeyAndClass} = require('../_helpers');

var {Link} = require('react-router');
var NavMain = require('../nav-main');

module.exports = React.createClass({
  displayName: 'StartPage',

  getDefaultProps: function () {
    return {cssName: this.displayName};
  },

  render: function () {
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
