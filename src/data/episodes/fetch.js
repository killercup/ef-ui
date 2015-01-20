var l = require('lodash');
var bus = require('../bus');
var API = require('../api');

function list(data) {
  data = data || {};
  var query = l.defaults({}, data.query || {}, {
    sort: '-aired', limit: '200'
  });

  return API.request({url: '/episodes', query: query})
  .then(function (res) {
    bus.dispatch({type: 'EPISODES_FETCHED', data: res.body.episodes});
  })
  .catch(function (err) {
    bus.dispatch({type: 'EPISODES_FAILURE', data: err});
  });
}

function detail(data) {
  data = data || {};
  if (!data.id) {
    var err = new Error("Can't load episode without ID");
    bus.dispatch({type: 'EPISODE_FAILURE', data: err});
    return Promise.reject(err);
  }

  return API.request({url: '/episodes/' + data.id})
  .then(function (res) {
    if (!l.isObject(res.body.episodes)) { return; }
    bus.dispatch({type: 'EPISODE_FETCHED', data: res.body.episodes});
  })
  .catch(function (err) {
    bus.dispatch({type: 'EPISODE_FAILURE', data: err});
  });
}

bus.getEvents('EPISODES_FETCH').throttle(200).onValue(list);
bus.getEvents('EPISODE_FETCH').throttle(200).onValue(detail);

module.exports = {
  list: list,
  detail: detail
};
