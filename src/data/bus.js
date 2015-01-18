var Kefir = require('kefir');

var eventBus = Kefir.bus();
eventBus.log();

function isType(type) {
  return function (e) { return e.type === type; };
}

eventBus.filter(function (e) {
  console.log('filtering demo', e);
  return e.type === 'LOGIN';
})
.onValue(function (x) {
  console.log('hi x', x);
});

module.exports = {
  events: eventBus,
  dispatch: eventBus.emit.bind(eventBus),
  isType: isType,
  getEvents: function (type) {
    console.log('filering by type', type);
    return eventBus.filter(isType(type)).pluck('data');
  }
};
