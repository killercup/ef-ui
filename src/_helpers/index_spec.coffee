expect = require('chai').expect
h = require('./index')

describe 'Helpers', ->
  describe 'padding number with leading zeros', ->
    pad = h.padDigits

    it 'should add the required amount of zeros', ->
      expect( pad(4, 42) ).to.be.a 'string'

      expect( pad(2, 42) ).to.eql "42"
      expect( pad(3, 42) ).to.eql "042"
      expect( pad(4, 42) ).to.eql "0042"
      expect( pad(5, 42) ).to.eql "00042"

    it 'should respect large numbers', ->
      expect( pad(4, 15000) ).to.eql "15000"

    it 'should work with floats', ->
      expect( pad(3, 1.5) ).to.eql "1.5"

  describe 'default key and class', ->
    dk = h.defaultKeyAndClass

    it 'should be curried', ->
      expect(dk).to.be.a 'function'
      expect(dk('demo')).to.be.a 'function'

    it 'should return {key, className}', ->
      demo = dk('Module')('part')

      expect(demo).to.be.an 'object'
      expect(demo.key).to.be.a 'string'
      expect(demo.className).to.be.a 'string'

    it 'should require a module name', ->
      expect(->
        dk()
      ).to.throw()

    it 'should require an item name', ->
      demo = dk('Module')

      expect(->
        demo()
      ).to.throw()

    it 'should correctly create key and class name', ->
      mod = 'Module'
      part = 'part'

      demo = dk(mod)(part)

      expect(demo.key).to.eql part
      expect(demo.className).to.eql "#{mod}-#{part}"

    it 'should allow key to be overwritten', ->
      mod = 'Module'
      part = 'part'
      key = 'lorem'

      demo = dk(mod)(part, key: key)

      expect(demo.key).to.eql key
      expect(demo.className).to.eql "#{mod}-#{part}"

    it 'should support additional keys', ->
      mod = 'Module'
      part = 'part'
      extraClass = 'is-active'
      id = 'test'

      demo = dk(mod)(part, className: extraClass, id: id)

      expect(demo.key).to.eql part
      expect(demo.className).to.contain "#{mod}-#{part}"
      expect(demo.className).to.contain extraClass
      expect(demo.id).to.eql id
