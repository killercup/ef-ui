var l = require('lodash');

module.exports = function (propFields, stateFields) {
  propFields = propFields || [];
  stateFields = stateFields || [];

  if (!l.isArray(propFields) || !l.isArray(stateFields)) {
    if (process.env.NODE_ENV !== 'production') {
      console.error("called updated_at mixin without field array",
        propFields, stateFields
      );
    }
    return {};
  }

  return {
    shouldComponentUpdate: function (nextProps, nextState) {
      var props = this.props;
      var state = this.state;

      var propsUpdated = l.any(propFields, function (field) {
        return props[field].updated_at !== nextProps[field].updated_at;
      });
      var statesUpdated = l.any(stateFields, function (field) {
        return state[field].updated_at !== nextState[field].updated_at;
      });
      return propsUpdated || statesUpdated;
    }
  };
};
