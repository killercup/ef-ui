React = require('react')
{Link} = require('react-router-component')
{article, div, h1, p, ul, li, button} = React.DOM

module.exports = React.createClass
  displayName: 'StartPage'
  render: ->
    (article {}, [
      (p {key: 0}, [
        "Hello. "
        (Link {key: 0, href: "/episodes/2"}, "Episode")
      ])
    ])