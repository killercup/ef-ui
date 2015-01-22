var l = require('lodash');
var React = require('react');

var bus = require('../data');
var LatestVotesStore = require('../data/latest-votes');
var ShowsStore = require('../data/shows');
var EpisodesStore = require('../data/episodes');

module.exports = React.createClass({
  displayName: 'VotingPage',
  pageTitle: 'Vote',

  mixins: [
    require('../helpers/mixins/events'),
    require('../helpers/mixins/page_title'),
    require('../helpers/mixins/keys')
  ],

  getInitialState() {
    var latestVotes = LatestVotesStore.find();
    var show_ids = l.uniq(l.pluck(latestVotes, 'show_id'));
    var episode_ids = l.uniq(l.pluck(latestVotes, 'episode_id'));

    return {
      latestVotes: latestVotes,
      show_ids: show_ids,
      shows: ShowsStore.findIds(show_ids),
      episode_ids: episode_ids,
      episodes: EpisodesStore.findIds(episode_ids)
    };
  },

  componentDidMount() {
    bus.dispatch({type: 'LATEST_VOTES_FETCH'});
  },

  events: {
    LATEST_VOTES_UPDATED() {
      var data = this.getInitialState();
      bus.dispatch({type: 'SHOWS_FETCH', data: {
        query: {ids: data.show_ids}
      }});
      bus.dispatch({type: 'EPISODES_FETCH', data: {
        query: {ids: data.episode_ids}
      }});

      this.setState(data);
    },
    SHOWS_UPDATED() { this.setState(this.getInitialState()); },
    EPISODES_UPDATED() { this.setState(this.getInitialState()); }
  },

  render() {
    var k = this.getKeyHelper();

    console.log(this.state);

    return (
      <article {...k('main')}>
        <pre>
          {JSON.stringify(this.state.latestVotes, null, 2)}
        </pre>
      </article>
    );
  }
});
