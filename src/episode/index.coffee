React = require('react')
ReactProps = require('react-prop-schema')
{defaultKeyAndClass, padDigits} = require('../_base/helpers')

require('./style.less')

{div, article, span} = React.DOM

module.exports = React.createClass
  displayName: 'Episode'

  propTypes:
    title: ReactProps.require(type: 'string', pattern: 'Lorem.sentence')
    show: ReactProps.require(type: 'string', pattern: 'Company.companyName')
    number: ReactProps.require(type: 'number', min: 0, max: 1024)
    season: ReactProps.require(type: 'number', min: 0, max: 1024)

  render: ->
    k = defaultKeyAndClass('EfEpisode')

    (article {className: 'EfEpisode'}, [
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
