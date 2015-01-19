var React = require('react');
var Router = require('react-router');

var bus = require('../data');
var ShowsStore = require('../data/shows');

module.exports = React.createClass({
  displayName: 'ShowPage',
  pageTitle: "Show",

  mixins: [
    Router.State,
    require('../helpers/mixins/page_title'),
    require('../helpers/mixins/keys'),
    require('../helpers/mixins/events')
  ],

  getShow() {
    return ShowsStore.findOne({id: +this.getParams().id});
  },

  getInitialState() {
    return {
      show: this.getShow()
    };
  },

  componentDidMount() {
    this.setState({loading: true});
    if (!this.getParams().id) {
      throw new Error('dafuq!');
    }
    bus.dispatch({
      type: 'SHOW_FETCH', data: {id: +this.getParams().id}
    });
  },

  events: {
    SHOWS_UPDATED() {
      this.setState({loading: false, show: this.getShow()});
    }
  },

  render() {
    var k = this.getKeyHelper();
    var show = this.state.show || {};

    if (show.name) {
      this.changePageTitle(show.name);
    }

    return (
      <article {...k('main')}>
        {this.state.loading &&
          <div {...k('loading')}>Loading...</div>
        }
        <h1 {...k('headline')}>
          { show.name ? show.name : "Show ID #" + this.getParams().id }
        </h1>
        <p {...k('description')}>{show.description}</p>
      </article>
    );
  }
});
