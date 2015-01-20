var l = require('lodash');

var bus = require('../bus');
var API = require('../api');

var actions = {
  TRIGGER: 'USER_CREATE',
  FAILURE: 'USER_CREATE_FAILURE',
  SUCCESS: 'USER_CREATED'
};

function createUser(data) {
  data = data || {};

  if (!data.email || !data.name || !data.password) {
    return bus.dispatch({
      type: actions.FAILURE,
      err: new Error("Data missing")
    });
  }

  return API.request({
    url: '/users', method: 'post', withAuth: false,
    data: l.pick(data, 'email', 'name', 'password')
  })
  .then(function (res) {
    bus.dispatch({type: actions.SUCCESS, data: res.body});
  })
  .catch(function (err) {
    return bus.dispatch({
      type: actions.FAILURE, data: err
    });
  });
}

bus.getEvents(actions.TRIGGER).onValue(createUser);

module.exports = {
  create: createUser
};
