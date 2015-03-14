var Component = require('./index');
var ReactProps = require('react-prop-schema');

module.exports = {
  component: Component,
  name: Component.displayName,
  demos: [
    ReactProps.fake(Component, {key: 1, type: 'failure'}),
    ReactProps.fake(Component, {key: 1, type: 'success'}),
    ReactProps.fake(Component, {key: 1})
  ]
};
