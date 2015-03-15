var React = require('react');
var {State} = require('react-router');

var {dispatch} = require('../../data');

var SearchBox = require('../search-box');
var SearchResults = require('../search-results');
var Alert = require('../alert');

module.exports = React.createClass({
  displayName: 'SearchPage',
  pageTitle: "Search",

  mixins: [
    State,
    require('../../helpers/mixins/page_title'),
    require('../../helpers/mixins/events'),
    require('../../helpers/mixins/keys')
  ],

  events: {
    SEARCH_FAILURE(err) { this.setState({failure: err.data}); },
    SEARCH_RESULTS(data) {
      this.setState({failure: null, results: data});
    }
  },

  componentWillMount() {
    this.triggerInitialQuery(this.getQuery().query);
  },

  componentWillReceiveProps() {
    this.triggerInitialQuery(this.getQuery().query);
  },

  triggerInitialQuery(query) {
    if (!query || !query.length) { return; }
    console.log('triggering search for', query);

    dispatch({ type: 'SEARCH_QUERY', data: {query} });
  },

  render() {
    var k = this.getKeyHelper();
    var s = this.state;

    return (
      <article {...k('main')}>
        <SearchBox {...k('input')} query={this.getQuery().query} />
        {s.failure && // FIXME: add support for loading state
          <Alert {...k('failure')} type="failure" message={s.failure.message} />
        }
        <SearchResults {...k('list')} results={s.results || []}/>
      </article>
    );
  }
});
