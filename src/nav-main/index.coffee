React = require('react')
ReactProps = require('react-prop-schema')
{defaultKeyAndClass} = require('../_helpers')

require('./style.less') if process.env.BROWSER

{nav, header, a} = React.DOM
{Link} = require('react-router-component')
NavLink = require('./nav-link')

module.exports = React.createClass
  displayName: 'NavMain'

  getDefaultProps: ->
    cssName: @displayName

  render: ->
    k = defaultKeyAndClass(@props.cssName)

    (header {className: @props.cssName}, [
      (nav k('nav'), [
        (NavLink k('link', key: 'start', href: "/"), [
          "Start"
        ])
        (NavLink k('link', key: 'shows', href: "/shows"), [
          "Shows"
        ])
        (NavLink k('link', key: 'me', href: "/me"), [
          "My Profile"
        ])
        if process.env.NODE_ENV isnt 'production'
          (a k('link', key: 'styleguide', href: "/styleguide.html"), [
            "Styleguide"
          ])
      ])
    ])
