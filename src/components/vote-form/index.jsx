var React = require('react/addons');
var ReactProps = require('react-prop-schema');

if (process.env.BROWSER) { require('./style.less'); }

var bus = require('../../data');
var ratingToText = require('../../helpers/rating_to_text');

module.exports = React.createClass({
  displayName: 'VoteForm',

  mixins: [
    require('../../helpers/mixins/keys')
  ],

  propTypes: {
    episodeId: ReactProps.require({type: 'number', min: 1}),
    showId: ReactProps.require({type: 'number', min: 1})
  },

  triggerVote(event) {
    event.preventDefault();

    bus.dispatch({
      type: 'VOTE_CREATE',
      data: {
        rating: +event.target.value.trim(),
        episode_id: this.props.episodeId,
        show_id: this.props.showId
      }
    });
  },

  render() {
    var k = this.getKeyHelper();

    var buttons = Object.keys(ratingToText.options).map(rating => {
      return (
        <button key={rating} name="rating" value={rating}
           onClick={this.triggerVote}>
          {ratingToText(rating)}
        </button>
      );
    });

    return (
      <div {...k()}>
        {buttons}
      </div>
    );
  }
});
