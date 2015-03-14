var Component = require('./index');
var ReactProps = require('react-prop-schema');

module.exports = {
  component: Component,
  name: Component.displayName,
  demos: [
    ReactProps.fake(Component, {key: 1,
      wallpaper: 'fanart/original/80348-48.jpg'
    }),
    ReactProps.fake(Component, {key: 1,
      wallpaper: 'fanart/original/257655-16.jpg'
    })
  ]
};
