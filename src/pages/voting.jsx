var l = require('lodash');
var React = require('react');

var bus = require('../data');
var LatestVotesStore = require('../data/latest-votes');
var ShowsStore = require('../data/shows');
var EpisodesStore = require('../data/episodes');
var VotesStore = require('../data/votes');

var Template = require('../components/templates/voting');

var VICINITY_SIZE = 3;

module.exports = React.createClass({
  displayName: 'VotingPage',
  pageTitle: 'Vote',

  mixins: [
    require('../helpers/mixins/events'),
    require('../helpers/mixins/page_title')
  ],

  getInitialState() {
    var latestVotes = LatestVotesStore.find()
    .map((vote) => {
      var show = ShowsStore.findOne({id: vote.show_id});
      var episode_ids = this.getEpisodesAroundVote(vote, show);
      var episodes = EpisodesStore.findIds(episode_ids);
      var votes = VotesStore.findIds(episode_ids, 'episode_id');
      return {latestVote: vote, show, episode_ids, episodes, votes};
    });

    var show_ids = l(latestVotes).pluck('latestVote').flatten()
      .pluck('show_id').uniq().value();
    var episode_ids = l(latestVotes).pluck('episode_ids').flatten()
      .uniq().value();

    return {latestVotes, show_ids, episode_ids};
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
      this.setState(data);
    },
    SHOWS_UPDATED() {
      var data = this.getInitialState();

      bus.dispatch({type: 'EPISODES_FETCH', data: {
        query: {ids: data.episode_ids}
      }});
      bus.dispatch({type: 'VOTES_FETCH', data: {
        query: {episode_ids: data.episode_ids}
      }});

      this.setState(data);
    },
    EPISODES_UPDATED() { this.setState(this.getInitialState()); }
  },

  getEpisodesAroundVote(vote, show) {
    if (!vote || !show || !show.links || !show.links.episodes) { return; }
    var epList = show.links.episodes;
    var lastVotedEp = vote.episode_id;
    var index = epList.indexOf(lastVotedEp);
    if (index < 0) { console.error('vote not in ep list', vote, show); return; }
    var epsInVicinity = epList.slice(
      Math.max(index - VICINITY_SIZE, 0),
      Math.min(index + VICINITY_SIZE, epList.length - 1)
    );
    return epsInVicinity;
  },

  render() {
    return (
      <Template {...this.state} />
    );
  }
});
