if (process.env.NODE_ENV !== 'production') {
  var ReactProps = require('react-prop-schema');

  module.exports = {
    query: ReactProps.optional({type: 'string'})
  };
}
