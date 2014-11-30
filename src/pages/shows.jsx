var l = require('lodash');
var React = require('react');
var {defaultKeyAndClass} = require('../_helpers');

var NavMain = require('../nav-main');
var Episode = require('../episode');

module.exports = React.createClass({
  displayName: 'ShowsPage',

  getDefaultProps() {
    return {cssName: this.displayName};
  },

  render() {
    var k = defaultKeyAndClass(this.props.cssName);

    var showList = l.range(1, 8).map(function (i) {
      return <li key={i}>Lorem Ipsum</li>
    });

    return (
      <article {...k('main')}>
        <ul {...k('list')}>{showList}</ul>
      </article>
    );
  }
});
