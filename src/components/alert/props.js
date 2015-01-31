if (process.env.NODE_ENV !== 'production') {
  var ReactProps = require('react-prop-schema');

  module.exports = {
    type: ReactProps.require({type: 'string', pattern: 'lorem.word'}),
    message: ReactProps.require({type: 'string', pattern: 'lorem.sentence'})
  };
}
