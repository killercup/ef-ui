if (process.env.NODE_ENV !== 'production') {
  var ReactProps = require('react-prop-schema');

  module.exports = {
    latestVote: ReactProps.require({type: 'object'}),
    show: ReactProps.require({type: 'object'}),
    episodes: ReactProps.require({type: 'array'}),
    votes: ReactProps.require({type: 'array'})
  };
}
