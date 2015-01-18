var expect = require('chai').expect;
var React = require('react/addons');
var ReactProps = require('react-prop-schema');

var Episode = require('./index');

var H = require('../../helpers/test_helpers');
var T = React.addons.TestUtils;

H.dom();

describe("Episode Component", function () {
  afterEach(H.resetDom);

  describe("basic information", function () {
    var Ep = T.renderIntoDocument(ReactProps.fake(Episode));
    var cls = function (part) {
      return "" + Episode.displayName + "-" + part;
    };

    it("should show episode reference information", function () {
      var title = T.findRenderedDOMComponentWithClass(Ep, cls('name'));
      expect(title.getDOMNode().textContent).to.match(/^S(\d*)E(\d)/);
      expect(title.getDOMNode().textContent).to.contain(Ep.props.title);
    });

    it("should show the episode's show name", function () {
      var show = T.findRenderedDOMComponentWithClass(Ep, cls('show'));
      expect(show.getDOMNode().textContent).to.contain(Ep.props.show);
    });
  });

  describe('interactions', function () {
    it('should contain a clickable link');
  });
});
