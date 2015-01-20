var l = require('lodash');

var bus = require('../bus');
var API = require('../api');

var actions = {
  TRIGGER: 'VOTE_CREATE',
  FAILURE: 'VOTE_CREATE_FAILURE',
  SUCCESS: 'VOTE_CREATED'
};

function createVote(data) {
  data = data || {};

  if (!data.rating || !data.episode_id) {
    return bus.dispatch({
      type: actions.FAILURE,
      err: new Error("Data missing")
    });
  }

  return API.request({
    url: '/votes', method: 'post',
    data: l.pick(data, 'episode_id', 'show_id', 'rating')
  })
  .then(function (res) {
    bus.dispatch({type: actions.SUCCESS, data: res.body.votes});
  })
  .catch(function (err) {
    return bus.dispatch({
      type: actions.FAILURE, data: err
    });
  });
}

bus.getEvents(actions.TRIGGER).onValue(createVote);

module.exports = {
  create: createVote
};
