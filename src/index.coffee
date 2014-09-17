React = require('react')
{Locations, Location, NotFound} = require('react-router-component')

require('./_style/index.less') if process.env.BROWSER

App = React.createClass
  displayName: 'App'
  render: ->
    (Locations {hash: process.env.NODE_ENV is 'development'}, [
      (Location {path: '/', handler: require('./pages/start')})
      (Location {path: '/episodes/:id', handler: require('./pages/episode')})
      (NotFound {handler: require('./pages/error404')})
    ])

React.renderComponent(
  (App {}, [])
  document.getElementById('container')
)