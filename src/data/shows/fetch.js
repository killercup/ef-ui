var l = require('lodash');
var bus = require('../bus');
var API = require('../api');

function list() {
  return API.request({url: '/shows'})
  .then(function (res) {
    bus.dispatch({type: 'SHOWS_FETCHED', data: res.body.shows});
  })
  .catch(function (err) {
    bus.dispatch({type: 'SHOWS_FAILURE', data: err});
  });
}

function detail(data) {
  var id = data.id;
  return API.request({url: '/shows/' + id, query: {include: 'episodes'}})
  .then(function (res) {
    var show;
    if (l.isObject(res.body.shows)) {
      show = res.body.shows;
    }
    if (l.isArray(res.body.episodes) && l.isNumber(res.body.episodes[0])) {
      show.episodes = res.body.episodes;
    }
    bus.dispatch({type: 'SHOW_FETCHED', data: show});
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
