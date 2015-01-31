if (process.env.NODE_ENV !== 'production') {
  var ReactProps = require('react-prop-schema');

  module.exports = {
    latestVotes: ReactProps.require({type: 'array', schema: {
      latestVote: {type: 'object', required: true, schema: {
        rating: {type: 'number'}
      }}
    }}),
    show_ids: ReactProps.optional({type: 'array'}),
    episodes_ids: ReactProps.optional({type: 'array'})
  };
}
