React = require('react')
require('./_base/styles.less')

Episode = require('./episode')

{article, div, h1, p, ul, li, button} = React.DOM

App = React.createClass
  displayName: 'App'
  render: ->
    (article {}, [
      (p {}, "Sup, bro?")
      (Episode {
        title: 'Listen', show: 'Doctor Who (2005)',
        season: 8, number: 4
      })
    ])

React.renderComponent(
  (App {}, [])
  document.getElementById('container')
)