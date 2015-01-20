var l = require('lodash');

module.exports = function (propFields, stateFields, updatedAtField) {
  var pFields = propFields || [];
  var sFields = stateFields || [];
  var freshness = updatedAtField || 'updated_at';

  if (!l.isArray(pFields) || !l.isArray(sFields)) {
    if (process.env.NODE_ENV !== 'production') {
      console.error("called updated_at mixin without field array",
        pFields, sFields
      );
    }
    return {};
  }

  return {
    shouldComponentUpdate: function (nextP, nextS) {
      var curP = this.props;
      var curS = this.state;

      var i, len;
      for (i = 0, len = pFields.length; i < len; i++) {
        if (curP[pFields[i]][freshness] !== nextP[pFields[i]][freshness]) {
          return true;
        }
      }
      for (i = 0, len = sFields.length; i < len; i++) {
        if (curS[sFields[i]][freshness] !== nextS[sFields[i]][freshness]) {
          return true;
        }
      }
      return false;
    }
  };
};
