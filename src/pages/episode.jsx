var React = require('react');
var Router = require('react-router');
var {defaultKeyAndClass} = require('../_helpers');

var Episode = require('../episode');

module.exports = React.createClass({
  displayName: 'EpisodePage',

  mixins: [Router.State],

  getDefaultProps() {
    return {cssName: this.displayName};
  },

  render() {
    var k = defaultKeyAndClass(this.props.cssName);

    return (
      <article {...k('main')}>
        <Episode {...k('main')} title="Listen" show="Doctor Who (2005)"
          season={8} number={+this.getParams().id} />
      </article>
    );
  }
});
