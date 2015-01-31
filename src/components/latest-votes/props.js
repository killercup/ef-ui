if (process.env.NODE_ENV !== 'production') {
  var ReactProps = require('react-prop-schema');

  module.exports = {
    latestVotes: ReactProps.require({
      type: 'array', schema: {
        show_id: {type: 'number', required: true},
        vote: {type: 'object', required: true, schema: {
          rating: {type: 'number', min: 1, max: 3},
          episode_id: {type: 'number', require: true},
        }},
        episodes: {type: 'array', require: true, min: 1, schema: {
          show_id: {type: 'number', require: true}
        }}
      }
    }),
  };
}
