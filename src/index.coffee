###
# # React.js With Fake Properties
#
# Create a Person component with specified prop types and render it with
# automatically generated fake data.
###

React = require('react')
{article, div, h1, p, ul, li, button} = React.DOM

# Load the magic
ReactProps = require('react-prop-schema')

# Create an example component
Person = React.createClass
  displayName: 'Person'

  # This is the important bit: Each prop key is described using ReactProps
  propTypes:
    name: ReactProps.require
      first: {type: 'string', min: 1, max: 21, pattern: 'Name.firstName'}
      last: {type: 'string', min: 1, max: 42, pattern: 'Name.lastName'}

  render: ->
    (article {key: 0, className: 'person panel panel-default'}, [
      (div {key: 0, className: 'name panel-heading'}, [
        (h1 {key: 0, className: 'panel-title'}, [
          @props.name.first, " ", @props.name.last
        ])
      ])
    ])

# Render stuff to the DOM
React.renderComponent(
  (Person {key: 0, name: {first: 42}}, [])
  document.getElementById('container')
)
