var expect = require('chai').expect;
var pad = require('./pad_digits');

describe('Number Padding Helper', function () {
  it('should add the required amount of zeros', function () {
    expect(pad(4, 42)).to.be.a('string');
    expect(pad(2, 42)).to.eql("42");
    expect(pad(3, 42)).to.eql("042");
    expect(pad(4, 42)).to.eql("0042");
    expect(pad(5, 42)).to.eql("00042");
  });

  it('should respect large numbers', function () {
    expect(pad(4, 15000)).to.eql("15000");
  });

  it('should work with floats', function () {
    expect(pad(3, 1.5)).to.eql("1.5");
  });
});
