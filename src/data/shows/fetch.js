var l = require('lodash');
var Promise = require('Promise');

var bus = require('../bus');
var API = require('../api');

function list(data) {
  data = data || {};

  return API.request({url: '/shows', query: data.query})
  .then(function (res) {
    bus.dispatch({type: 'SHOWS_FETCHED', data: res.body.shows});
  })
  .catch(function (err) {
    bus.dispatch({type: 'SHOWS_FAILURE', data: err});
  });
}

function detail(data) {
  data = data || {};
  if (!data.id) {
    var err = new Error("Can't load show without ID");
    bus.dispatch({type: 'SHOW_FAILURE', data: err});
    return Promise.reject(err);
  }

  return API.request({url: '/shows/' + data.id, query: {include: 'episodes'}})
  .then(function (res) {
    if (!l.isObject(res.body.shows)) { return; }
    bus.dispatch({type: 'SHOW_FETCHED', data: res.body.shows});
  })
  .catch(function (err) {
    bus.dispatch({type: 'SHOW_FAILURE', data: err});
  });
}

bus.getEvents('SHOWS_FETCH').throttle(200).onValue(list);
bus.getEvents('SHOW_FETCH').throttle(200).onValue(detail);

module.exports = {
  list: list,
  detail: detail
};
