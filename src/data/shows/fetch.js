var bus = require('../bus');
var API = require('../api');

function list() {
  return API.request({url: '/shows'})
  .then(function (res) {
    bus.dispatch({type: 'SHOWS_FETCHED', data: res.body.shows});
  })
  .then(function (err) {
    bus.dispatch({type: 'SHOWS_FAILURE', data: err});
  });
}

function detail(data) {
  var id = data.id;
  return API.request({url: '/shows/' + id})
  .then(function (res) {
    bus.dispatch({type: 'SHOW_FETCHED', data: res.body.shows});
  })
  .then(function (err) {
    bus.dispatch({type: 'SHOW_FAILURE', data: err});
  });
}

bus.getEvents('SHOWS_FETCH').throttle(200).onValue(list);
bus.getEvents('SHOW_FETCH').throttle(200).onValue(detail);

module.exports = {
  list: list,
  detail: detail
};
