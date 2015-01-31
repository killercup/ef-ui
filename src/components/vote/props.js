if (process.env.NODE_ENV !== 'production') {
  var ReactProps = require('react-prop-schema');

  module.exports = {
    vote: ReactProps.optional({
      rating: {required: true, type: 'number', min: 1, max: 3},
      id: {required: true, type: 'number', min: 1}
    }),
    episodeId: ReactProps.require({type: 'number', min: 1}),
    showId: ReactProps.require({type: 'number', min: 1})
  };
}
