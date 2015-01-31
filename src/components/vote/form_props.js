if (process.env.NODE_ENV !== 'production') {
  var ReactProps = require('react-prop-schema');

  module.exports = {
    episodeId: ReactProps.require({type: 'number', min: 1}),
    showId: ReactProps.require({type: 'number', min: 1})
  };
}
