React = require('react')
{defaultKeyAndClass} = require('../_helpers')

{article, div, h1, p, ul, li, button} = React.DOM
NavMain = require('../nav-main')
Episode = require('../episode')

module.exports = React.createClass
  displayName: 'EpisodePage'

  getDefaultProps: ->
    cssName: @displayName

  render: ->
    k = defaultKeyAndClass(@props.cssName)

    (div {}, [
      (NavMain {key: 'nav-main'})
      (article k('main', className: 'page'), [
        (Episode k('main',
          title: 'Listen', show: 'Doctor Who (2005)',
          season: 8, number: +@props.id
        ))
      ])
    ])
