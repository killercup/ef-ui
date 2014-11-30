var React = require('react');
var ReactProps = require('react-prop-schema');
var {defaultKeyAndClass, padDigits} = require('../_helpers');

if (process.env.BROWSER) { require('./style.less'); }

module.exports = React.createClass({
  displayName: 'Episode',

  getDefaultProps: function () {
    return {cssName: this.displayName};
  },

  propTypes: {
    title: ReactProps.require({type: 'string', pattern: 'lorem.sentence'}),
    show: ReactProps.require({type: 'string', pattern: 'company.companyName'}),
    number: ReactProps.require({type: 'number', min: 0, max: 1024}),
    season: ReactProps.require({type: 'number', min: 0, max: 1024}),
  },

  render: function () {
    var k = defaultKeyAndClass(this.props.cssName);

    return (
      <article className={this.props.className}>
        <div {...k('show')}>
          {this.props.show}
        </div>
        <div {...k('name')}>
          S<span {...k('season')}>{padDigits(2, this.props.season)}</span>
          E<span {...k('number')}>{padDigits(2, this.props.number)}</span>
          &nbsp;
          <span {...k('title')}>{this.props.title}</span>
        </div>
      </article>
    );
  }
});
