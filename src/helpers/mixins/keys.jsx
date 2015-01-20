var defaultKeyAndClass = require('../key_helper');

module.exports = {
  getDefaultProps() {
    return {cssName: this.displayName};
  },

  getKeyHelper() {
    return defaultKeyAndClass(this.props.cssName);
  }
};
