l = require('lodash')
React = require('react')
Router = require('react-router-component')

module.exports = React.createClass
  displayName: 'NavLink'
  mixins: [Router.NavigatableMixin]

  getDefaultProps: ->
    className: ''
    activeClassName: 'is-active'

  isActive: ->
    this.getPath() is this.props.href

  render: ->
    if this.isActive()
      className = "#{@props.activeClassName} #{@props.className}"
    else
      className = @props.className

    Router.Link(
      l.defaults({}, {className: className}, @props),
      @props.children
    )
