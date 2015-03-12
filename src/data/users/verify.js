var l = require('lodash');

var bus = require('../bus');
var API = require('../api');

var actions = {
  TRIGGER: 'USER_VERIFY',
  FAILURE: 'USER_VERIFY_FAILURE',
  SUCCESS: 'USER_VERIFY_SUCCESS'
};

function verifyUser(data) {
  if (!l.isString(data.token)) {
    return bus.dispatch({
      type: actions.FAILURE,
      err: new Error("Verification token missing")
    });
  }

  return API.request({
    url: '/users/verify', method: 'put', withAuth: false,
    data: {token: data.token}
  })
  .then(function (res) {
    if (res.body.users && res.body.users.verified === true) {
      return bus.dispatch({type: actions.SUCCESS, data: res.body.users});
    }
    var err = new Error("User not verified");
    err.data = res.body;
    throw err;
  })
  .catch(function (err) {
    return bus.dispatch({
      type: actions.FAILURE, data: err
    });
  });
}

bus.getEvents(actions.TRIGGER).onValue(verifyUser);

module.exports = {
  verify: verifyUser
};
