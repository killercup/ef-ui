var Promise = require('Promise');
var l = require('lodash');
var request = require('superagent');

var CONFIG = {
  baseUrl: 'http://localhost:3001'
};

var bus = require('./bus');
var Auth = require('./auth');

function makeApiRequest(opts) {
  var settings = l.defaults({}, opts, {
    baseUrl: CONFIG.baseUrl,
    withAuth: true,
    method: 'get'
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
      else if (res.error) { reject(res.error); }
      else { resolve(res); }
    });
  });
}

function makeListRequest(name, _opts) {
  if (!l.isString(name)) {
    throw new Error("No api resource name given");
  }
  var opts = _opts || {};
  var pluralName = opts.pluralName || name + 's';
  var actions = l.defaults({}, opts.actions, {
    SUCCESS: pluralName.toUpperCase() + '_FETCHED',
    FAILURE: pluralName.toUpperCase() + '_FAILURE'
  });

  return function list(data) {
    data = data || {};
    var query = l.defaults({}, data.query, opts.query);

    return makeApiRequest({
      url: data.url || opts.url || '/' + pluralName,
      query: query
    })
    .then(function (res) {
      if (l.isFunction(opts.processResponse)) {
        opts.processResponse(res);
      }
      bus.dispatch({type: actions.SUCCESS, data: res.body[pluralName]});
    })
    .catch(function (err) {
      bus.dispatch({type: actions.FAILURE, data: err});
    });
  };
}

function makeDetailRequest(name, _opts) {
  if (!l.isString(name)) {
    throw new Error("No api resource name given");
  }
  var opts = _opts || {};
  var pluralName = opts.pluralName || name + 's';
  var actions = {
    SUCCESS: name.toUpperCase() + '_FETCHED',
    FAILURE: name.toUpperCase() + '_FAILURE'
  };

  return function detail(data) {
    data = data || {};
    if (!data.id) {
      var err = new Error("Can't load " + name + " without ID");
      bus.dispatch({type: actions.FAILURE, data: err});
      return Promise.reject(err);
    }

    return makeApiRequest({url: '/' + pluralName + '/' + data.id})
    .then(function (res) {
      if (!l.isObject(res.body[pluralName])) {
        return Promise.reject(new Error(
          "API response for resource detail was not an object."
        ));
      }
      if (l.isFunction(opts.processResponse)) {
        opts.processResponse(res);
      }
      bus.dispatch({type: actions.SUCCESS, data: res.body[pluralName]});
    })
    .catch(function (err) {
      bus.dispatch({type: actions.FAILURE, data: err});
    });
  };
}

module.exports = {
  config: CONFIG,
  request: makeApiRequest,
  makeListRequest: makeListRequest,
  makeDetailRequest: makeDetailRequest
};
