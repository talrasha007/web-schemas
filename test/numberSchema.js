var assert = require('assert'),
    expect = require('expect.js'),
    schemas = require('../schemas').schemas;

describe('NumberSchema', function () {
    it('should parse as expected.', function () {
        assert.equal(1, schemas.int.parse('1'));
        assert.equal(3.4, schemas.number.required().parse('3.4'));
        assert.equal(4, schemas.int.lt(5).gt(3).parse('4'));
    });

    it('should throw error.', function () {
        expect(function () { schemas.int.required().parse(); }).to.throwError();
        expect(function () { schemas.number.required().parse(); }).to.throwError();
        expect(function () { schemas.int.gte(3).lt(5).required().parse('6'); }).to.throwError();
        expect(function () { schemas.int.gte(3).lt(5).required().parse('2'); }).to.throwError();
        expect(function () { schemas.number.lt(8.3).parse('8.4'); }).to.throwError();
    });
});
