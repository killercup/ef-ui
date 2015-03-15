var Component = require('./index');
var ReactProps = require('react-prop-schema');

module.exports = {
  component: Component,
  name: Component.displayName,
  demos: [
    ReactProps.fake(Component, {key: 1, query: ''}),
    ReactProps.fake(Component, {key: 1, query: 'lorem ipsum'})
  ]
};
