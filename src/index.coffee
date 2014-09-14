React = require('react')
{Locations, Location, NotFound} = require('react-router-component')

require('./_base/styles.less')

App = React.createClass
  displayName: 'App'
  render: ->
    (Locations {hash: true}, [
      (Location {path: '/', handler: require('./pages/start')})
      (Location {path: '/episodes/:id', handler: require('./pages/episode')})
      (NotFound {handler: require('./pages/error404')})
    ])

React.renderComponent(
  (App {}, [])
  document.getElementById('container')
)