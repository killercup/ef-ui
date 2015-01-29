var bus = require('../bus');
var API = require('../api');

var list = API.makeListRequest('latest_vote', {
  url: '/votes/latest',
  fieldName: 'votes',
  withAuth: true
});

bus.getEvents('LATEST_VOTES_FETCH')
.onValue(list);

// LatestVotes are actually votes, to trigger that update as well.
bus.getEvents('LATEST_VOTES_FETCHED')
.onValue(function (data) {
  bus.dispatch({
    type: 'VOTES_FETCHED',
    data: data
  });
});

module.exports = {
  list: list
};
