var React = require('react');
var Props = require('react-prop-schema');

if (process.env.BROWSER) { require('./style.less'); }

module.exports = React.createClass({
  displayName: 'FormField',

  propTypes: {
    name: Props.require({type: 'string', pattern: 'lorem.word'}),
    label: Props.require({type: 'string', pattern: 'lorem.word'}),
    placeholder: Props.optional({type: 'string', pattern: 'lorem.sentence'}),
    namespace: Props.require({type: 'string', pattern: 'lorem.word'}),
    type: Props.require({type: 'string', pattern: 'internet.domainWord'})
  },

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
