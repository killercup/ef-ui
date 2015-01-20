var React = require('react/addons');
var ReactProps = require('react-prop-schema');
var padDigits = require('../../helpers/pad_digits');

if (process.env.BROWSER) { require('./style.less'); }

module.exports = React.createClass({
  displayName: 'Episode',

  mixins: [
    React.addons.PureRenderMixin,
    require('../../helpers/mixins/keys')
  ],

  propTypes: {
    name: ReactProps.require({type: 'string', pattern: 'lorem.sentence'}),
    show_id: ReactProps.require({type: 'number', min: 1}),
    number: ReactProps.require({type: 'number', min: 0, max: 1024}),
    season: ReactProps.require({type: 'number', min: 0, max: 1024}),
  },

  render() {
    var k = this.getKeyHelper();

    return (
      <article className="Episode">
        <div {...k('title')}>
          S<span {...k('season')}>{padDigits(2, this.props.season)}</span>
          E<span {...k('number')}>{padDigits(2, this.props.number)}</span>
          &nbsp;
          <span {...k('name')}>{this.props.name}</span>
        </div>
      </article>
    );
  }
});
