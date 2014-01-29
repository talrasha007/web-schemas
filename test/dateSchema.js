var assert = require('assert'),
    expect = require('expect.js'),
    schemas = require('../schemas').schemas;

describe('DateSchema', function () {
    it('should parse as expected.', function () {
        assert.equal(new Date('2014-01-01').getTime(), schemas.date.parse('2014-01-01').getTime());
        assert.equal(new Date('2014-01-01').getTime(), schemas.date.gte(new Date('2014-01-01')).parse('2014-01-01').getTime());
    });

    it('should throw error.', function () {
        expect(function () { schemas.date.parse('xxx'); }).to.throwError();
        expect(function () { schemas.date.gt(new Date('2014-01-01')).parse('2013-12-31'); }).to.throwError();
    });
});
