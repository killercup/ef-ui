var Kefir = require('kefir');

var eventBus = Kefir.bus();
if (process.env.NODE_ENV !== 'production') {
  eventBus.log();
}

function isType(type) {
  return function (e) { return e.type === type; };
}

module.exports = {
  events: eventBus,
  plug: eventBus.plug.bind(eventBus),
  dispatch: eventBus.emit.bind(eventBus),
  isType: isType,
  getEvents: function (type) {
    return eventBus.filter(isType(type)).pluck('data');
  }
};
