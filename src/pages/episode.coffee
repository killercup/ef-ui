React = require('react')
{article, div, h1, p, ul, li, button} = React.DOM

Episode = require('../episode')

module.exports = React.createClass
  displayName: 'EpisodePage'
  render: ->
    (article {}, [
      (Episode {
        key: 0,
        title: 'Listen', show: 'Doctor Who (2005)',
        season: 8, number: +@props.id
      })
    ])