var React = require('react');

if (process.env.BROWSER) {
  require('./style.less');
}

module.exports = React.createClass({
  displayName: 'Alert',

  mixins: [
    require('../../helpers/mixins/keys')
  ],

  propTypes: require('./props'),

  render() {
    var k = this.getKeyHelper();
    var p = this.props;

    return (
      <div {...k(null, {className: 'is-' + p.type})}>
        <h3 {...k('headline')}>
          There was a problem.
        </h3>
        <p {...k('message')}>
          {p.message}
        </p>
      </div>
    );
  }
});
