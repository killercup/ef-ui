var React = require('react');
var ReactProps = require('react-prop-schema');

if (process.env.BROWSER) { require('./style.less'); }

module.exports = React.createClass({
  display: "LatestVotes",

  mixins: [
    require('../../helpers/mixins/keys')
  ],

  propTypes: {
    latestVotes: ReactProps.require({
      type: 'array', schema: {
        show_id: {type: 'number', required: true},
        vote: {type: 'object', required: true, schema: {
          rating: {type: 'number', min: 1, max: 3},
          episode_id: {type: 'number', require: true},
        }},
        episodes: {type: 'array', require: true, min: 1, schema: {
          show_id: {type: 'number', require: true}
        }}
      }
    }),
  },

  render() {
    // var k = this.getKeyHelper();

    return (
      <section className="LatestVotes"> </section>
    );
  }
});
