var React = require('react');

var SearchBox = require('../search-box');
var SearchResults = require('../search-results');
var Alert = require('../alert');

module.exports = React.createClass({
  displayName: 'SearchPage',
  pageTitle: "Search",

  mixins: [
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

  render() {
    var k = this.getKeyHelper();
    var s = this.state;

    return (
      <article {...k('main')}>
        <SearchBox {...k('input')} />
        {s.failure &&
          <Alert {...k('failure')} type="failure" message={s.failure.message} />
        }
        <SearchResults {...k('list')} results={s.results || []}/>
      </article>
    );
  }
});
