var l = require('lodash');

var bus = require('../bus');
var API = require('../api');

var list = API.makeListRequest('episode', {
  query: {sort: '-aired', limit: 200}
});

var detail = API.makeDetailRequest('episode', {
  query: {embed: 'vote'},
  processResponse: function (res) {
    if (res && res.body && l.isObject(res.body.votes)) {
      bus.dispatch({
        type: 'VOTE_FETCHED',
        data: res.body.votes
      });
    }
  }
});

bus.getEvents('EPISODES_FETCH')
.throttle(200)
.onValue(list);

bus.getEvents('EPISODE_FETCH')
.throttle(200)
.onValue(detail);

module.exports = {
  list: list,
  detail: detail
};
