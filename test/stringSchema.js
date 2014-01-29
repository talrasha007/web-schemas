var assert = require('assert'),
    expect = require('expect.js'),
    schemas = require('../schemas').schemas;

describe('StringSchema', function () {
    it('should parse as expected.', function () {
        assert.equal('abc', schemas.string.parse('abc'));
        assert.equal('abc', schemas.string.required().parse('abc'));
        assert.equal('abc', schemas.string.notEmpty().parse('abc'));
        assert.equal('abc', schemas.string.isLowerCase().parse('abc'));
        assert.equal('abc', schemas.string.toLowerCase().parse('Abc'));
    });

    it('should throw error.', function () {
        expect(function () { schemas.string.required().parse() }).to.throwError();
        expect(function () { schemas.string.notEmpty().parse() }).to.throwError();
        expect(function () { schemas.string.notEmpty().parse('') }).to.throwError();
        expect(function () { schemas.string.isLowerCase().parse('Acb') }).to.throwError();
    });
});

