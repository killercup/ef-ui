var expect = require('chai').expect;
var dk = require('./key_helper');

describe('Default Key and Class Helper', function () {
  it('should be curried', function () {
    expect(dk).to.be.a('function');
    return expect(dk('demo')).to.be.a('function');
  });
  it('should return {key, className}', function () {
    var demo = dk('Module')('part');

    expect(demo).to.be.an('object');
    expect(demo.key).to.be.a('string');
    expect(demo.className).to.be.a('string');
  });

  it('should require a module name', function () {
    expect(dk).to["throw"]();
  });

  it('should return class name only when no item name is given', function () {
    var demo = dk('Module')();

    expect(demo.key).to.not.exist();
    expect(demo.className).to.eql('Module');
  });

  it('should correctly create key and class name', function () {
    var mod = 'Module';
    var part = 'part';
    var demo = dk(mod)(part);
    expect(demo.key).to.eql(part);
    expect(demo.className).to.eql("" + mod + "-" + part);
  });

  it('should allow key to be overwritten', function () {
    var mod = 'Module';
    var part = 'part';
    var key = 'lorem';
    var demo = dk(mod)(part, {
      key: key
    });
    expect(demo.key).to.eql(key);
    expect(demo.className).to.eql("" + mod + "-" + part);
  });

  it('should support additional keys', function () {
    var mod = 'Module';
    var part = 'part';
    var extraClass = 'is-active';
    var id = 'test';
    var demo = dk(mod)(part, {
      className: extraClass,
      id: id
    });
    expect(demo.key).to.eql(part);
    expect(demo.className).to.contain("" + mod + "-" + part);
    expect(demo.className).to.contain(extraClass);
    expect(demo.id).to.eql(id);
  });
});
