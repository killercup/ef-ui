var request = require('superagent');
var bus = require('../bus');

var API = require('../api');

function login(data) {
  request.post(API.baseUrl + '/auth')
  .send({email: data.email, password: data.password})
  .set('Accept', 'application/json')
  .end(function (err, res) {
    if (err) {
      return bus.dispatch({
        type: 'LOGIN_FAILURE', data: (res && res.body || err)
      });
    }
    if (typeof res.body.token !== 'string') {
      return bus.dispatch({
        type: 'LOGIN_FAILURE', data: {message: 'No token'}
      });
    }
    bus.dispatch({type: 'LOGIN_SUCCESS', data: {token: res.body.token}});
  });
}

// Handle stuff like this: `{type: 'login', data: {email, password}}`
bus.getEvents('LOGIN').tap(function (x) {
  console.log('tapped into LOGIN', x);
}).onValue(login);
