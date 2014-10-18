React = require('react')
{defaultKeyAndClass} = require('../_helpers')

{article, div, h1, p, ul, li, button} = React.DOM
NavMain = require('../nav-main')
Episode = require('../episode')

module.exports = React.createClass
  displayName: 'ShowsPage'

  getDefaultProps: ->
    cssName: @displayName

  render: ->
    k = defaultKeyAndClass(@props.cssName)

    (div {}, [
      (NavMain {key: 'nav-main'})
      (article k('main', className: 'page'), [
        (ul k('list'), [1..8].map (i) ->
          (li {key: i}, "Lorem Ipsum")
        )
      ])
    ])
