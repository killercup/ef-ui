var l = require('lodash');

var bus = require('../bus');
var API = require('../api');

var actions = {
  TRIGGER: 'USER_UPDATE',
  FAILURE: 'USER_UPDATE_FAILURE',
  SUCCESS: 'USER_UPDATE_SUCCESS',
  NOTICE: 'USER_UPDATE_NOTICE'
};

function updateProfile(data) {
  if (!data.id) {
    return bus.dispatch({
      type: actions.FAILURE,
      err: new Error("User ID missing")
    });
  }

  var newData = {};
  if (l.isString(data.name) && data.name.length) {
    newData.name = data.name;
  }
  if (l.isString(data.email) && data.email.length) {
    newData.email = data.email;
  }
  if (l.isString(data.password) && data.password.length) {
    newData.password = data.password;
  }

  return API.request({
    url: '/users/' + data.id, method: 'put',
    data: newData
  })
  .then(function (res) {
    bus.dispatch({type: actions.SUCCESS, data: res.body.users});
    if (res.body.users.verified === false) {
      bus.dispatch({type: actions.NOTICE, data: res.body.users});
    }
  })
  .catch(function (err) {
    return bus.dispatch({
      type: actions.FAILURE, data: err
    });
  });
}

bus.getEvents(actions.TRIGGER).onValue(updateProfile);

module.exports = {
  update: updateProfile
};
