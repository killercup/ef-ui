var React = require('react');
var {State} = require('react-router');

var bus = require('../data');
var ShowsStore = require('../data/shows');
var EpisodesStore = require('../data/episodes');

var EpisodeList = require('../components/episode-list');

module.exports = React.createClass({
  displayName: 'ShowPage',
  pageTitle: "Show",

  mixins: [
    State,
    require('../helpers/mixins/page_title'),
    require('../helpers/mixins/keys'),
    require('../helpers/mixins/events')
  ],

  getInitialState() {
    var showId = +this.getParams().id;
    var show = ShowsStore.findOne({id: showId});

    return {
      showId: showId,
      show: show,
      episodes: EpisodesStore.find({show_id: showId})
    };
  },

  componentDidMount() {
    bus.dispatch({
      type: 'SHOW_FETCH', data: {id: this.state.showId}
    });
  },

  fetchEpisodes() {
    bus.dispatch({
      type: 'EPISODES_FETCH', data: {query: {show_id: this.state.showId}}
    });
  },

  events: {
    SHOWS_UPDATED() {
      var data = this.getInitialState();
      this.setState(data);
      this.fetchEpisodes();
    },
    EPISODES_UPDATED() {
      var data = this.getInitialState();
      this.setState(data);
    }
  },

  render() {
    var k = this.getKeyHelper();
    var show = this.state.show || {};
    var eps = this.state.episodes || [];

    if (show.name) {
      this.changePageTitle(show.name);
    }

    return (
      <article {...k('main')}>
        <h1 {...k('headline')}>
          { show.name ? show.name : "Show ID #" + this.getParams().id }
        </h1>
        <p {...k('description')}>{show.description}</p>
        {eps.length > 0 &&
          <EpisodeList {...k('episodes')} episodes={eps} />
        }
      </article>
    );
  }
});
