var bus = require('../bus');
var API = require('../api');

var list = API.makeListRequest('vote', {withAuth: true});

var detail = API.makeDetailRequest('vote', {withAuth: true});

bus.getEvents('VOTES_FETCH')
.onValue(list);

bus.getEvents('VOTE_FETCH')
.onValue(detail);

module.exports = {
  list: list,
  detail: detail
};
