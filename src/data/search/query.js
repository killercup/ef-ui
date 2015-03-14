var l = require('lodash');
var request = require('superagent');

var CONFIG = require('../../config').api;
var bus = require('../bus');

var actions = {
  TRIGGER: 'SEARCH_QUERY',
  FAILURE: 'SEARCH_FAILURE',
  SUCCESS: 'SEARCH_RESULTS'
};

var runningQueries = [];

function abortRequest(req, _, requests) {
  req.on('abort', function () {
    var index = requests.indexOf(req);
    if (index >= 0) {
      l.pull(requests, req);
    }
  });
  req.abort();
}

function abortOtherRequests(requests) {
  try {
    requests.forEach(abortRequest);
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('abortOtherRequests', e);
    }
  }
}

function searchQuery(data) {
  data = data || {};

  if (!data.query || !data.query.length) {
    return bus.dispatch({
      type: actions.FAILURE,
      err: new Error("Data missing")
    });
  }

  // Take a snapshot of the currently running request and cancel those.
  abortOtherRequests(l.clone(runningQueries));

  // This is a regular superagent query (not the promisified version), because
  // we need to access the request's `.abort` function. (The shim for ES6
  // Promises we use ('when') does not offer cancellable Promises.)
  var req = request.get(CONFIG.baseUrl + '/shows')
  .set('Accept', 'application/json')
  .query({match: data.query, limit: data.limit})
  .end(function (err, res) {
    if (err || res.error) {
      var resErr = res.error;
      if (l.isObject(res.body)) { resErr.data = res.body; }
      return bus.dispatch({
        type: actions.FAILURE, data: resErr
      });
    }
    bus.dispatch({type: actions.SUCCESS, data: res.body.shows});
  });

  runningQueries.push(req);
}

bus.getEvents(actions.TRIGGER).onValue(searchQuery);

module.exports = {
  create: searchQuery
};
