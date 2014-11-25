l = require('lodash')
React = require('react')
ReactProps = require('react-prop-schema')
Router = require('react-router')

module.exports = React.createClass
  displayName: 'NavLink'
  mixins: [Router.NavigatableMixin]

  getDefaultProps: ->
    className: ''
    activeClassName: 'is-active'

  propTypes:
    className: ReactProps.optional(type: 'string')
    activeClassName: ReactProps.optional(type: 'string')
    is_active: ReactProps.optional(type: 'boolean')

  isActive: ->
    @props.is_active or (@getPath() is @props.href)

  render: ->
    className = "#{@props.className}"
    if this.isActive()
      className += " #{@props.activeClassName}"

    Router.Link(
      l.defaults({}, {className: className}, @props),
      @props.children
    )
