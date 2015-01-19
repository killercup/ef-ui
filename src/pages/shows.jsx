var React = require('react');
var {Link} = require('react-router');

var bus = require('../data');
var Shows = require('../data/shows');

module.exports = React.createClass({
  displayName: 'ShowsPage',
  pageTitle: 'Login',
  mixins: [
    require('../helpers/mixins/events'),
    require('../helpers/mixins/keys')
  ],

  getInitialState() {
    return {
      shows: Shows.find()
    };
  },

  componentDidMount() {
    bus.dispatch({type: 'SHOWS_FETCH'});
  },

  events: {
    SHOWS_UPDATED() { this.setState({shows: Shows.find()}); }
  },

  render() {
    var k = this.getKeyHelper();

    var showList = this.state.shows.map((show) => {
      return (
        <li key={show.id}>
          <Link {...k('name')} to="show" params={{id: show.id}}>
            {show.name}
          </Link>
        </li>
      );
    });

    return (
      <article {...k('main')}>
        <ul {...k('list')}>{showList}</ul>
      </article>
    );
  }
});
