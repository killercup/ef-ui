var React = require('react');
var Component = require('./index');

module.exports = {
  component: Component,
  name: Component.displayName,
  demos: [
    (
      <Component key={0}/>
    ),
    (
      <a key={1} href='/demo'
        className={Component.displayName + '-link'}>
        Link inactive
      </a>
    ),
    (
      <a key={1} href='/demo'
        className={Component.displayName + '-link is-active'}>
        Link active
      </a>
    )
  ]
};
