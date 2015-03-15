var React = require('react');
var Router = require('react-router');
var padDigits = require('../../helpers/pad_digits');

var bus = require('../../data');
var Auth = require('../../data/auth');
var ShowsStore = require('../../data/shows');
var EpisodesStore = require('../../data/episodes');
var VotesStore = require('../../data/votes');

var Vote = require('../vote');

module.exports = React.createClass({
  displayName: 'EpisodePage',
  pageTitle: "Episode",

  mixins: [
    Router.State,
    require('../../helpers/mixins/page_title'),
    require('../../helpers/mixins/keys'),
    require('../../helpers/mixins/events')
  ],

  getInitialState() {
    var epId = +this.getParams().id;
    var ep = EpisodesStore.findOne({id: epId});
    var show = ep && ep.id && ShowsStore.findOne({id: ep.show_id});
    var vote = ep && ep.id && VotesStore.findOne({episode_id: ep.id});

    return {
      episodeId: epId,
      episode: ep,
      show: show,
      vote: vote
    };
  },

  componentWillMount() {
    bus.dispatch({
      type: 'EPISODE_FETCH', data: {id: this.state.episodeId}
    });
  },

  fetchShow() {
    if (!this.state.episode || !this.state.episode.show_id) {
      return;
    }
    bus.dispatch({
      type: 'SHOW_FETCH', data: {id: this.state.episode.show_id}
    });
  },

  events: {
    EPISODES_UPDATED() {
      var data = this.getInitialState();
      this.setState(data);
      this.fetchShow();
    },
    SHOWS_UPDATED() {
      var data = this.getInitialState();
      this.setState(data);
    },
    VOTES_UPDATED() {
      var data = this.getInitialState();
      this.setState(data);
    }
  },

  render() {
    var k = this.getKeyHelper();
    var e = this.state.episode;
    var s = this.state.show;
    var v = this.state.vote;

    if (e) {
      return (
        <article {...k('main')}>
          {s &&
            <p {...k('show-name')}>
              <Router.Link key={s.id} to="show" params={{id: s.id}}>
                {s.name}
              </Router.Link>
            </p>
          }
          <h1 {...k('title')}>
            S<span {...k('season')}>{padDigits(2, e.season)}</span>
            E<span {...k('number')}>{padDigits(2, e.number)}</span>
            &nbsp;
            <span {...k('name')}>{e.name}</span>
          </h1>
          { Auth.exists() &&
            <Vote {...k('vote')} vote={v} episodeId={e.id} showId={e.show_id} />
          }
          <p {...k('aired')}>
            {e.aired}
          </p>
          <p {...k('description')}>
            {e.description}
          </p>
        </article>
      );
    }

    return (
      <article {...k('loading')}>
        <p>Loading</p>
      </article>
    );
  }
});
