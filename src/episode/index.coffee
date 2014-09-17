React = require('react')
ReactProps = require('react-prop-schema')
{defaultKeyAndClass, padDigits} = require('../_helpers')

require('./style.less') if process.env.BROWSER

{div, article, span} = React.DOM

module.exports = React.createClass
  displayName: 'Episode'

  getDefaultProps: ->
    cssName: @displayName

  propTypes:
    title: ReactProps.require(type: 'string', pattern: 'Lorem.sentence')
    show: ReactProps.require(type: 'string', pattern: 'Company.companyName')
    number: ReactProps.require(type: 'number', min: 0, max: 1024)
    season: ReactProps.require(type: 'number', min: 0, max: 1024)

  render: ->
    k = defaultKeyAndClass(@props.cssName)

    (article {className: @props.cssName}, [
      (div k('show'), @props.show)
      (div k('name'), [
        "S"
        (span k('season'), padDigits(2, @props.season))
        "E"
        (span k('number'), padDigits(2, @props.number))
        " "
        (span k('title'), @props.title)
      ])
    ])
