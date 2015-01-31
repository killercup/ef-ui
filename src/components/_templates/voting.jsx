var React = require('react/addons');
var l = require('lodash');

if (process.env.BROWSER) { require('./voting.less'); }

var VoteBox = require('../vote-box');

module.exports = React.createClass({
  displayName: 'VotingLayout',

  mixins: [
    React.addons.PureRenderMixin,
    require('../../helpers/mixins/keys')
  ],

  propTypes: require('./voting_props'),

  render() {
    var k = this.getKeyHelper();

    var voteBoxes = l(this.props.latestVotes)
    .sortBy(item => item.latestVote.updated_at)
    .reverse()
    .map((voteByShow) => {
      if (voteByShow.show && voteByShow.episodes) {
        return <VoteBox key={voteByShow.latestVote.show_id} {...voteByShow}/>;
      }
      return (
        <div key={"load" + voteByShow.latestVote.show_id} className="loading">
          Loading...
        </div>
      );
    })
    .value();

    // FIXME Save the ordering of shows so that a new vote will not move that
    // vote box to the top.

    return (
      <section {...k()}>
        {voteBoxes}
      </section>
    );
  }
});
