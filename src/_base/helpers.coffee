l = require('lodash')

module.exports =
  # cf. http://stackoverflow.com/a/10075654/1254484
  padDigits: (digits, number) ->
    Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number

  # Works like this:
  # ```js
  # defaultKeyAndClass('EfModule')('show', {id: 42, className: 'beer'})
  # //=> {key: 'show', className: 'EfModule-show beer', id: 42}
  # ```
  defaultKeyAndClass: (moduleName) -> (itemName, opts={}) ->
    cx = ["#{moduleName}-#{itemName}"]
    if opts.className then cx.push(opts.className)
    l.defaults({}, {className: cx.join(' ')}, opts, {key: itemName})