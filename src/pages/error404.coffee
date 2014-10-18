React = require('react')
{Link} = require('react-router-component')
{article, div, h1, p, ul, li, button} = React.DOM

module.exports = React.createClass
  displayName: 'Error404Page'
  render: ->
    # Function defined by server context to set HTTP status
    @props.setHTTPStatus?(404)

    (article {}, [
      (h1 {key: 1}, "Not found.")
      (p {key: 0}, [
        (Link {key: 0, href: "/"}, "Back to the beginning.")
      ])
    ])
