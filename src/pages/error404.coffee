React = require('react')
{defaultKeyAndClass} = require('../_helpers')

{article, div, h1, p, ul, li, button} = React.DOM
{Link} = require('react-router')
NavMain = require('../nav-main')

module.exports = React.createClass
  displayName: 'Error404Page'

  getDefaultProps: ->
    cssName: @displayName

  render: ->
    # Function defined by server context to set HTTP status
    @props.setHTTPStatus?(404)

    k = defaultKeyAndClass(@props.cssName)

    (div {}, [
      (NavMain {key: 'nav-main'})
      (article k('main', className: 'page'), [
        (h1 k('headline'), "Not found.")
        (p k('description'), [
          (Link {key: 0, href: "/"}, "Back to the beginning.")
        ])
      ])
    ])
