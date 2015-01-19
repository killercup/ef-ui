var bus = require('../bus');

var API = require('../api');

function login(data) {
  return API.request({
    url: '/auth', method: 'post', withAuth: false,
    data: {email: data.email, password: data.password}
  })
  .then(function (res) {
    if (typeof res.body.token !== 'string') {
      throw new Error("No token in login response.");
    }
    bus.dispatch({type: 'LOGIN_SUCCESS', data: res.body});
  })
  .catch(function (err) {
    return bus.dispatch({
      type: 'LOGIN_FAILURE', data: err
    });
  });
}

// Handle stuff like this: `{type: 'login', data: {email, password}}`
bus.getEvents('LOGIN').onValue(login);
