var bus = require('../bus');
var API = require('../api');

var list = API.makeListRequest('show');

var detail = API.makeDetailRequest('show');

bus.getEvents('SHOWS_FETCH')
.throttle(200)
.onValue(list);

bus.getEvents('SHOW_FETCH')
.throttle(200)
.onValue(detail);

module.exports = {
  list: list,
  detail: detail
};
