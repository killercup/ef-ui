var React = require('react');
var {State} = require('react-router');

var bus = require('../data');
var ShowsStore = require('../data/shows');
var EpisodesStore = require('../data/episodes');

var Template = require('../components/_templates/show');

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

  componentWillMount() {
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
    var show_id = this.getParams().id;
    var show = this.state.show || {};

    if (!show.name) {
      return (
        <article key={'loading' + show_id} {...k('loading')}>
          Loading Show ID #{show_id}
        </article>
      );
    }

    this.changePageTitle(show.name);
    return (
      <Template key={show_id} show={show} episodes={this.state.episodes} />
    );
  }
});
