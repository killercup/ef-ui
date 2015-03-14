var React = require('react');

var SearchBox = require('../search-box');
var SearchResults = require('../search-results');

module.exports = React.createClass({
  displayName: 'SearchPage',
  pageTitle: "Search",

  mixins: [
    require('../../helpers/mixins/page_title'),
    require('../../helpers/mixins/events'),
    require('../../helpers/mixins/keys')
  ],

  events: {
    SEARCH_FAILURE(data) { this.setState({failure: data}); },
    SEARCH_RESULTS(data) {
      this.setState({results: data});
    }
  },

  render() {
    var k = this.getKeyHelper();

    return (
      <article {...k('main')}>
        <SearchBox {...k('input')} />
        <SearchResults {...k('list')} results={this.state.results || []}/>
      </article>
    );
  }
});
