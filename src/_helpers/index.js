var l = require('lodash');

module.exports = {
  padDigits: function (digits, number) {
    return new Array(Math.max(digits - String(number).length + 1, 0))
      .join(0) + number;
  },

  defaultKeyAndClass: function (moduleName, baseOpts) {
    baseOpts = baseOpts || {};
    if (!moduleName) {
      throw new Error('No Module Name Given');
    }
    return function (itemName, opts) {
      opts = opts || {};
      if (!itemName) {
        throw new Error('No Item Name Given');
      }
      var cx = ["" + moduleName + "-" + itemName];
      if (opts.className) {
        cx.push(opts.className);
      }
      return l.defaults({}, {
        className: cx.join(' ')
      }, opts, {
        key: itemName
      }, baseOpts);
    };
  }
};
