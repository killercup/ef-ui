React = require('react')

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
        (section {
          key: c.slug or c.name, className: "#{name}-item"
        }, [
          (h2 {key: 'header', className: "#{name}-item-header"}, c.name)
        ].concat c.demos.map (d, index) ->
          (article {key: index, className: "#{name}-item-demo"}, d)
        )
    ])

window.renderToDOM = renderToDOM = ->
  React.renderComponent(
    (Styleguide {}, []),
    document.getElementById('container')
  )

renderToDOM()
