var React = require('react');

if (process.env.BROWSER) { require('./style.less'); }

module.exports = React.createClass({
  displayName: 'FormField',

  propTypes: require('./props'),

  render() {
    var p = this.props;
    var id = p.namespace + '-' + p.name;

    return (
      <p className="FormField">
        <label key="label" htmlFor={id}>
          {p.label}
        </label>
        <input key="input" name={p.name} type={p.type}
          id={id} placeholder={p.placeholder} />
      </p>
    );
  }
});
