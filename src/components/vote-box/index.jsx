var l = require('lodash');
var React = require('react/addons');

if (process.env.BROWSER) { require('./style.less'); }

var {Link} = require('react-router');
var EpisodeLine = require('../episode-line');

module.exports = React.createClass({
  displayName: 'VoteBox',

  mixins: [
    React.addons.PureRenderMixin,
    require('../../helpers/mixins/keys')
  ],

  propTypes: require('./props'),

  render() {
    var k = this.getKeyHelper();
    var p = this.props;

    var episodes = l.map(p.episodes, (episode) => {
      var vote = l.findWhere(p.votes, {episode_id: episode.id});
      var isLatest = vote && (vote.id === p.latestVote.id) && 'is-latest';
      return (
        <EpisodeLine show={p.show} episode={episode} vote={vote}
          key={episode.id} className={isLatest} />
      );
    });

    return (
      <article {...k()}>
        <header {...k('show')}>
          <h1 key="h1">
            <Link key="link" to="show" params={{id: p.show.id}}>
              {p.show.name}
            </Link>
          </h1>
        </header>
        {episodes.length ?
          <section {...k('episodes')}>{episodes}</section> :
          <section {...k('loading')}>Loading</section>
        }
      </article>
    );
  }
});
