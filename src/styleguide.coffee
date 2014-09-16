React = require('react')

if (process.env.NODE_ENV isnt 'production') and window
  # Enable dev tools
  window.React = React

if process.env.BROWSER
  require('./_base/styles.less')
  require('./_base/styleguide.less')

{div, section, article, h1, h2} = React.DOM

components = [
  require('./episode/demo')
]

Styleguide = React.createClass
  displayName: 'Styleguide'
  render: ->
    (div {key: '0'}, [
      (h1 {key: 'header', className: 'EfStyleguide-header'}, "Styleguide")
      components.map (c) ->
        (section {
          key: c.slug or c.name, className: 'EfStyleguide-item'
        }, [
          (h2 {key: 'header', className: 'EfStyleguide-item-header'}, c.name)
        ].concat c.demos.map (d, index) ->
          (article {key: index, className: 'EfStyleguide-item-demo'}, d)
        )
    ])

React.renderComponent(
  (Styleguide {}, [])
  document.getElementById('container')
)