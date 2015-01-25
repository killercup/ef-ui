var React = require('react/addons');
var ReactProps = require('react-prop-schema');

if (process.env.BROWSER) { require('../icon/stars.less'); }

var VoteForm = require('./form');
var ratingToIcon = require('./rating_to_icon');

module.exports = React.createClass({
  displayName: "Vote",

  mixins: [
    React.addons.PureRenderMixin,
    require('../../helpers/mixins/keys')
  ],

  propTypes: {
    vote: ReactProps.optional({
      rating: {required: true, type: 'number', min: 1, max: 3},
      id: {required: true, type: 'number', min: 1}
    }),
    episodeId: ReactProps.require({type: 'number', min: 1}),
    showId: ReactProps.require({type: 'number', min: 1})
  },

  render() {
    var k = this.getKeyHelper();
    var p = this.props;

    if (p.vote && p.vote.id) {
      return (
        <span {...k()}>
          {ratingToIcon(p.vote.rating)}
        </span>
      );
    }

    return (
      <VoteForm episodeId={p.episodeId} showId={p.showId} />
    );
  }
});
