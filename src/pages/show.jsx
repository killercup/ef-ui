var React = require('react');
var Router = require('react-router');

var firstBy = require('then-by');

var bus = require('../data');
var ShowsStore = require('../data/shows');
var EpisodesStore = require('../data/episodes');

var Episode = require('../components/episode');

module.exports = React.createClass({
  displayName: 'ShowPage',
  pageTitle: "Show",

  mixins: [
    Router.State,
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
    if (!this.getParams().id) {
      throw new Error('dafuq!');
    }
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
      this.fetchEpisodes(data.episode_ids);
    },
    EPISODES_UPDATED() {
      var data = this.getInitialState();
      this.setState(data);
    }
  },

  render() {
    var k = this.getKeyHelper();
    var show = this.state.show || {};

    if (show.name) {
      this.changePageTitle(show.name);
    }

    var eps = this.state.episodes
      .sort(firstBy('season').thenBy('number'))
      .map(ep => <Episode key={ep.id} {...ep}/>);

    return (
      <article {...k('main')}>
        <h1 {...k('headline')}>
          { show.name ? show.name : "Show ID #" + this.getParams().id }
        </h1>
        <p {...k('description')}>{show.description}</p>
        {eps.length > 0 &&
          <section {...k('episodes')}>
            {eps}
          </section>
        }
      </article>
    );
  }
});
