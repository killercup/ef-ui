if (process.env.NODE_ENV !== 'production') {
  var Props = require('react-prop-schema');

  module.exports = {
    name: Props.require({type: 'string', pattern: 'lorem.word'}),
    label: Props.require({type: 'string', pattern: 'lorem.word'}),
    placeholder: Props.optional({type: 'string', pattern: 'lorem.sentence'}),
    namespace: Props.require({type: 'string', pattern: 'lorem.word'}),
    type: Props.require({type: 'string', pattern: 'internet.domainWord'})
  };
}
