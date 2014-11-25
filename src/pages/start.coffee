React = require('react')
{defaultKeyAndClass} = require('../_helpers')

{article, div, h1, p, ul, li, button} = React.DOM
{Link} = require('react-router')
NavMain = require('../nav-main')

module.exports = React.createClass
  displayName: 'StartPage'

  getDefaultProps: ->
    cssName: @displayName

  render: ->
    k = defaultKeyAndClass(@props.cssName)

    (div {}, [
      (NavMain {key: 'nav-main'})
      (article k('main', className: 'page'), [
        (p k('description'), [
          "Hello. "
          (Link {key: 0, href: "/episodes/2"}, "Episode")
        ])
      ])
    ])
