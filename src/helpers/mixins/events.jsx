var {getEvents} = require('../../data');

module.exports = {
  getInitialState() {
    return {};
  },

  componentDidMount() {
    Object.keys(this.events || {}).forEach((event) => {
      getEvents(event).onValue(this.events[event].bind(this));
    });
  },

  componentWillUnmount() {
    Object.keys(this.events || {}).forEach((event) => {
      getEvents(event).offValue(this.events[event].bind(this));
    });
  }
};
