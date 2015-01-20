var l = require('lodash');
var Kefir = require('kefir');
var bus = require('../bus');

var store = [];

var events = Kefir.emitter();
bus.plug(events.throttle(100));

function updateItem(list, item) {
  var oldItem = l.findWhere(list, {id: item.id});
  if (oldItem) {
    l.assign(oldItem, item);
  } else {
    list.push(item);
  }
}

function updateList(list, newList) {
  newList.forEach(updateItem.bind(null, list));
}

bus.getEvents('SHOWS_FETCHED')
.onValue(function (data) {
  updateList(store, data);
  events.emit({type: 'SHOWS_UPDATED'});
});

bus.getEvents('SHOW_FETCHED')
.onValue(function (item) {
  updateItem(store, item);
  events.emit({type: 'SHOWS_UPDATED'});
});

module.exports = {
  events: events,
  find: function (query) {
    return l.where(store, query);
  },
  findOne: function (query) {
    return l.findWhere(store, query);
  }
};
