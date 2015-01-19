var {defaultKeyAndClass} = require('../index');

module.exports = {
  getDefaultProps() {
    return {cssName: this.displayName};
  },

  getKeyHelper() {
    return defaultKeyAndClass(this.props.cssName);
  }
};
