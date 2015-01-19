var Promise = require('Promise');
var l = require('lodash');
var request = require('superagent');

var CONFIG = {
  baseUrl: 'http://localhost:3001'
};

var Auth = require('./auth');

function makeApiRequest(opts) {
  var settings = l.defaults({}, opts, {
    baseUrl: CONFIG.baseUrl,
    withAuth: true,
    method: 'post'
  });

  return new Promise(function (resolve, reject) {
    var method = settings.method.toLowerCase();
    var r = request[method](settings.baseUrl + settings.url)
      .set('Accept', 'application/json');

    if (settings.data) { r = r.send(settings.data); }
    if (settings.query) { r = r.query(settings.query); }
    if (settings.withAuth) {
      var token = Auth.get('token');
      if (!token) { return reject(new Error("No auth token present.")); }
      r = r.set('Authorization', 'Bearer ' + token);
    }

    r.end(function (err, res) {
      if (err) { reject(err); }
      else { resolve(res); }
    });
  });
}

module.exports = {
  config: CONFIG,
  request: makeApiRequest
};
