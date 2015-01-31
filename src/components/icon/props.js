if (process.env.NODE_ENV !== 'production') {
  var ReactProps = require('react-prop-schema');

  module.exports = {
    name: ReactProps.require({type: 'string', pattern: 'lorem.word'}),
    title: ReactProps.optional({type: 'string', pattern: 'lorem.word'}),
    size: ReactProps.optional({type: 'number', min: 1}),
    width: ReactProps.optional({type: 'number', min: 1}),
    height: ReactProps.optional({type: 'number', min: 1})
  };
}
