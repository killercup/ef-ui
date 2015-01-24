var React = require('react/addons');
var ReactProps = require('react-prop-schema');
var padDigits = require('../../helpers/pad_digits');

if (process.env.BROWSER) { require('./style.less'); }

module.exports = React.createClass({
  displayName: 'Episode',

  mixins: [
    require('../../helpers/mixins/keys')
  ],

  propTypes: {
    name: ReactProps.require({type: 'string', pattern: 'lorem.sentence'}),
    number: ReactProps.require({type: 'number', min: 0, max: 1024}),
    season: ReactProps.require({type: 'number', min: 0, max: 1024})
  },

  shouldComponentUpdate(nextProps) {
    return nextProps.updated_at ?
      this.props.updated_at !== nextProps.updated_at
      : true;
  },

  render() {
    var k = this.getKeyHelper();
    var p = this.props;

    return (
      <div {...k('title')}>
        S<span {...k('season')}>{padDigits(2, p.season)}</span>
        E<span {...k('number')}>{padDigits(2, p.number)}</span>
        &nbsp;
        <span {...k('name')}>{p.name}</span>
      </div>
    );
  }
});
