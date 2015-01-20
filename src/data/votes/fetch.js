var bus = require('../bus');
var API = require('../api');

var list = API.makeListRequest('vote');

var detail = API.makeDetailRequest('vote');

bus.getEvents('VOTES_FETCH')
.throttle(200)
.onValue(list);

bus.getEvents('VOTE_FETCH')
.throttle(200)
.onValue(detail);

module.exports = {
  list: list,
  detail: detail
};
