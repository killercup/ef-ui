React = require('react')
require('./_base/styles.css')

Episode = require('./episode')

{article, div, h1, p, ul, li, button} = React.DOM

App = React.createClass
  displayName: 'App'
  render: ->
    (article {}, [
      (p {}, "Sup, bro?")
      (Episode {})
    ])

React.renderComponent(
  (App {}, [])
  document.getElementById('container')
)