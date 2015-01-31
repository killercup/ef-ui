if (process.env.NODE_ENV !== 'production') {
  var ReactProps = require('react-prop-schema');

  module.exports = {
    user: ReactProps.require({type: 'object', schema: {
      id: {type: 'number', required: true, min: 1},
      name: {type: 'string', required: true, pattern: 'lorem.words'},
      email: {type: 'string', required: true, pattern: 'internet.email'}
    }}),
    failure: ReactProps.optional({type: 'object'}),
    notice: ReactProps.optional({type: 'object'})
  };
}
