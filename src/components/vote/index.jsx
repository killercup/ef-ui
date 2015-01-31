var React = require('react/addons');

if (process.env.BROWSER) { require('../icon/stars.less'); }

var VoteForm = require('./form');
var ratingToIcon = require('./rating_to_icon');

module.exports = React.createClass({
  displayName: "Vote",

  mixins: [
    React.addons.PureRenderMixin,
    require('../../helpers/mixins/keys')
  ],

  propTypes: require('./props'),

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
