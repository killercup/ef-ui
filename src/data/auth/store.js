var bus = require('../bus');

var auth = {token: null};

if (process.env.NODE_ENV !== 'production') {
  try { window.auth = auth; } catch (e) {}
}

bus.getEvents('LOGIN_SUCCESS')
.tap(function (x) {
  console.log('tapped into LOGIN_SUCCESS', x);
})
.onValue(function (data) {
  auth.token = data.token;
  bus.dispatch({type: 'LOGGED_IN'});
});

module.exports = {
  exists: function () {
    return !!auth.token;
  },
  get: function (field) {
    return auth[field];
  }
};
