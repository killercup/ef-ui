if (process.env.NODE_ENV !== 'production') {
  var ReactProps = require('react-prop-schema');

  module.exports = {
    vote: ReactProps.optional({
      rating: {type: 'number', min: 1, max: 3}
    }),
    episode: ReactProps.require({
      name: {type: 'string', pattern: 'lorem.sentence', rqeuired: true},
      season: {type: 'number', rqeuired: true},
      number: {type: 'number', rqeuired: true},
      description: {type: 'string', pattern: 'lorem.sentence'}
    }),
    show: ReactProps.require({
      name: {type: 'string', pattern: 'lorem.sentence', rqeuired: true}
    })
  };
}
