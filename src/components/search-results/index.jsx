var React = require('react');

if (process.env.BROWSER) { require('./style.less'); }

var SearchResult = require('../search-result');

module.exports = React.createClass({
  displayName: 'SearchResults',

  mixins: [
    require('../../helpers/mixins/keys')
  ],

  render() {
    var k = this.getKeyHelper();
    var results = this.props.results.map(show => {
      return <SearchResult show={show} key={"show-" + show.id}/>;
    });

    return (
      <section {...k()}>
        {results}
      </section>
    );
  }
});
