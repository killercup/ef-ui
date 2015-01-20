var React = require('react/addons');
var ReactProps = require('react-prop-schema');

if (process.env.BROWSER) { require('./style.less'); }

var ratingToText = require('../../helpers/rating_to_text');

module.exports = React.createClass({
  displayName: "Vote",

  mixins: [
    React.addons.PureRenderMixin,
    require('../../helpers/mixins/keys')
  ],

  propTypes: {
    id: ReactProps.require({type: 'number', min: 1}),
    rating: ReactProps.require({type: 'number', min: 1, max: 3})
  },

  render() {
    var k = this.getKeyHelper();

    return (
      <span {...k()}>
        {ratingToText(this.props.rating)}
      </span>
    );
  }
});
