var React = require('react');
var ReactProps = require('react-prop-schema');
var l = require('lodash');

if (process.env.BROWSER) { require('./voting.less'); }

var VoteBox = require('../vote-box');

module.exports = React.createClass({
  displayName: 'VotingLayout',

  mixins: [
    require('../../helpers/mixins/keys')
  ],

  propTypes: (process.env.NODE_END !== 'production') && {
    latestVotes: ReactProps.require({type: 'array', schema: {
      latestVote: {type: 'object', required: true, schema: {
        rating: {type: 'number'}
      }},
      show: {type: 'object', schema: {
        name: {required: true, type: 'string'}
      }},
      episodes: {type: 'array', schema: {
        name: {required: true, type: 'string'}
      }},
      votes: {type: 'array', schema: {
        rating: {required: true, type: 'number', min: 1, max: 3}
      }}
    }}),
    show_ids: ReactProps.optional({type: 'array'}),
    episodes_ids: ReactProps.optional({type: 'array'})
  },

  render() {
    var k = this.getKeyHelper();

    var voteBoxes = l(this.props.latestVotes)
    .map((voteByShow) => {
      if (voteByShow.show && voteByShow.episodes) {
        return <VoteBox key={voteByShow.latestVote.show_id} {...voteByShow}/>;
      }
      return (
        <div key={voteByShow.latestVote.show_id} className="loading">
          Loading...
        </div>
      );
    })
    .sortBy('updated_at')
    .reverse()
    .value();

    return (
      <section {...k()}>
        {voteBoxes}
      </section>
    );
  }
});
