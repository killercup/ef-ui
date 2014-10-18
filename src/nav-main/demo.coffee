Component = require('./index')
NavLink = require('./nav-link')

module.exports =
  component: Component
  name: Component.displayName
  demos: [
    (Component {key: 0})
    (NavLink {
      key: 1, href: '/demo',
      className: "#{Component.displayName}-link"
    }, [
      'Link inactive'
    ])
    (NavLink {
      key: 1, href: '/demo', is_active: true,
      className: "#{Component.displayName}-link"
    }, [
      'Link active'
    ])
  ]
