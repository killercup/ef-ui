React = require('react')
{Locations, Location, NotFound} = require('react-router')

require('./_style/index.less') if process.env.BROWSER

App = React.createClass
  displayName: 'App'
  render: ->
    use_hash = (process.env.NODE_ENV is 'development')

    (Locations {path: @props.path, hash: use_hash}, [
      (Location {path: '/', handler: require('./pages/start')})
      (Location {path: '/episodes/:id', handler: require('./pages/episode')})
      (Location {path: '/shows', handler: require('./pages/shows')})
      (NotFound {
        handler: require('./pages/error404'),
        setHTTPStatus: (@props.setHTTPStatus or ->)
      })
    ])

module.exports = App

if process.env.BROWSER
  React.renderComponent(
    (App {}, [])
    document.getElementById('container')
  )
