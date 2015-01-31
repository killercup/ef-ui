if (process.env.NODE_ENV !== 'production') {
  var ReactProps = require('react-prop-schema');

  module.exports = {
    shows: ReactProps.require({
      type: 'array', schema: {
        id: {type: 'number', required: true}
      }
    }),
  };
}
