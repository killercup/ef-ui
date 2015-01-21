var expect = require('chai').expect;
var request = require('supertest');

var app = require('./index');

describe("Server Rendering", function () {
  var agent = request.agent(app);

  it("should basically work", function (cb) {
    return agent.get('/')
    .set('Accept', 'text/html')
    .expect('Content-Type', /html/)
    .expect(200)
    .end(function (err, res) {
      if (err) { return cb(err); }

      expect(res.text).to.be.a('string');

      // Check for react attributes
      //
      // TODO: This will be obsolete when server side rendering is only used
      // for static output.
      expect(res.text).to.contain("data-react",
        "No React attributes found in markup."
      );

      // Each page component has the `page` class, so check for that:
      expect(res.text).to.contain('div class="page"',
        "No `.page` element found in markup."
      );

      cb(null);
    });
  });
});
