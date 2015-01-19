var React = require('react');
var Router = require('react-router');

var Episode = require('../components/episode');

module.exports = React.createClass({
  displayName: 'EpisodePage',
  pageTitle: "Episode",

  mixins: [
    Router.State,
    require('../helpers/mixins/page_title'),
    require('../helpers/mixins/keys')
  ],

  render() {
    var k = this.getKeyHelper();

    return (
      <article {...k('main')}>
        <Episode {...k('main')} title="Listen" show="Doctor Who (2005)"
          season={8} number={+this.getParams().id} />
      </article>
    );
  }
});
