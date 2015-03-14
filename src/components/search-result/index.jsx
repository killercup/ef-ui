var React = require('react');

if (process.env.BROWSER) { require('./style.less'); }

var Show = require('../show');
var Episode = require('../episode');

module.exports = React.createClass({
  displayName: 'SearchResult',

  mixins: [
    require('../../helpers/mixins/keys')
  ],

  render() {
    var result;

    if (this.props.show) {
      result = <Show {...this.props.show} />;
    } else if (this.props.episode) {
      result = <Episode {...this.props.show} />;
    }

    return result;
  }
});
