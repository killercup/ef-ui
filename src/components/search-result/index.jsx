var React = require('react');

if (process.env.BROWSER) { require('./style.less'); }

module.exports = React.createClass({
  displayName: 'SearchResult',

  mixins: [
    require('../../helpers/mixins/keys')
  ],

  render() {
    var k = this.getKeyHelper();

    return (
      <article {...k()}>
        {this.props.show.name}
      </article>
    );
  }
});
