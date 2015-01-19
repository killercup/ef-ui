var React = require('react');

var bus = require('../data');
var ShowsStore = require('../data/shows');

var Shows = require('../components/shows');

module.exports = React.createClass({
  displayName: 'ShowsPage',
  pageTitle: 'Login',
  mixins: [
    require('../helpers/mixins/events'),
    require('../helpers/mixins/keys')
  ],

  getInitialState() {
    return {
      shows: ShowsStore.find()
    };
  },

  componentDidMount() {
    bus.dispatch({type: 'SHOWS_FETCH'});
  },

  events: {
    SHOWS_UPDATED() { this.setState({shows: ShowsStore.find()}); }
  },

  render() {
    var k = this.getKeyHelper();
    return (
      <article {...k('main')}>
        <Shows {...k('list')} shows={this.state.shows}/>
      </article>
    );
  }
});
