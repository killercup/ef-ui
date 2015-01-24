var bus = require('../bus');
var API = require('../api');

var list = API.makeListRequest('show', {
  query: {include: 'episodes'}
});

var detail = API.makeDetailRequest('show', {
  query: {include: 'episodes'}
});

bus.getEvents('SHOWS_FETCH')
.onValue(list);

bus.getEvents('SHOW_FETCH')
.onValue(detail);

module.exports = {
  list: list,
  detail: detail
};
