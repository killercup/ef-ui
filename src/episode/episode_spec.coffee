expect = require('chai').expect
React = require('react/addons')
ReactProps = require('react-prop-schema')
Episode = require('./index')

H = require('../_helpers/spec_helpers')
T = React.addons.TestUtils

H.dom()

describe "Episode Component", ->
  afterEach(H.resetDom)

  describe "basic information", ->
    Ep = T.renderIntoDocument ReactProps.fake(Episode)
    cls = (part) -> "#{Episode.displayName}-#{part}"

    it "should show episode reference information", ->
      title = T.findRenderedDOMComponentWithClass(Ep, cls('name'))
      expect(title.getDOMNode().textContent).to.match /^S(\d*)E(\d)/
      expect(title.getDOMNode().textContent).to.contain Ep.props.title

    it "should show the episode's show name", ->
      show = T.findRenderedDOMComponentWithClass(Ep, cls('show'))
      expect(show.getDOMNode().textContent).to.contain Ep.props.show

  describe 'interactions', ->
    # cf. https://github.com/andreypopp/react-router-component for testing
    # capabilities
    xit 'should contain a clickable link'