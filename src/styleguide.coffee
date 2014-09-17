React = require('react')
chCase = require('change-case')

{defaultKeyAndClass} = require('./_helpers')
{div, section, article, h1, h2} = React.DOM

if process.env.BROWSER
  require('./_style/index.less')
  require('./_style/styleguide.less')

if (process.env.NODE_ENV isnt 'production') and window
  # Enable dev tools
  window.React = React

# - - -

components = [
  require('./episode/demo')
]

Styleguide = React.createClass
  displayName: 'Styleguide'

  getDefaultProps: ->
    cssName: @displayName

  render: ->
    name = @props.cssName
    k = defaultKeyAndClass(@props.cssName)

    (div {key: '0'}, [
      (h1 k('header'), "Styleguide")
      components.map (c) ->
        (section k('item', key: chCase.paramCase(c.name)), [
          (h2 k('item-header'), chCase.titleCase(c.name))
        ].concat c.demos.map (d, index) ->
          (article k('item-demo', key: index), d)
        )
    ])

window.renderToDOM = renderToDOM = ->
  React.renderComponent(
    (Styleguide {}, []),
    document.getElementById('container')
  )

renderToDOM()
