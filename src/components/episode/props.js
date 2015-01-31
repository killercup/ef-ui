if (process.env.NODE_ENV !== 'production') {
  var ReactProps = require('react-prop-schema');

  module.exports = {
    name: ReactProps.require({type: 'string', pattern: 'lorem.sentence'}),
    number: ReactProps.require({type: 'number', min: 0, max: 1024}),
    season: ReactProps.require({type: 'number', min: 0, max: 1024})
  };
}
