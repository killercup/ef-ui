var React = require('react');

if (process.env.BROWSER) { require('./style.less'); }

module.exports = React.createClass({
  display: "LatestVotes",

  mixins: [
    require('../../helpers/mixins/keys')
  ],

  propTypes: require('./props'),

  render() {
    // var k = this.getKeyHelper();

    return (
      <section className="LatestVotes"> </section>
    );
  }
});
