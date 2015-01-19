var React = require('react');

var Router = require('react-router');

module.exports = React.createClass({
  displayName: 'ShowPage',
  pageTitle: "Show",

  mixins: [
    Router.State,
    require('../helpers/mixins/page_title'),
    require('../helpers/mixins/keys')
  ],

  render() {
    var k = this.getKeyHelper();

    return (
      <article {...k('main')}>
        <h1 {...k('headline')}>
          Show ID #{this.getParams().id}
        </h1>
      </article>
    );
  }
});
