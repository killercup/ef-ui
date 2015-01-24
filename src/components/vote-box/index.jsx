var l = require('lodash');
var React = require('react');
var ReactProps = require('react-prop-schema');

if (process.env.BROWSER) { require('./style.less'); }

var {Link} = require('react-router');
var EpisodeLine = require('../episode-line');

module.exports = React.createClass({
  displayName: 'VoteBox',

  mixins: [
    require('../../helpers/mixins/keys')
  ],

  propTypes: {
    latestVote: ReactProps.require({type: 'object'}),
    show: ReactProps.require({type: 'object'}),
    episodes: ReactProps.require({type: 'array'}),
    votes: ReactProps.require({type: 'array'})
  },

  render() {
    var k = this.getKeyHelper();

    var episodes = l(this.props.episodes)
    .map((episode) => {
      var vote = l.findWhere(this.props.votes, {episode_id: episode.id});
      var isLatest = vote && (vote.id === this.props.latestVote.id) && 'is-latest';
      return (
        <EpisodeLine show={this.props.show} episode={episode} vote={vote}
          key={episode.id} className={isLatest} />
      );
    })
    .value();

    return (
      <article {...k()}>
        <header {...k('show')}>
          <h1 key="h1">
            <Link key="link" to="show" params={{id: this.props.show.id}}>
              {this.props.show.name}
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
