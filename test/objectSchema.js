var assert = require('assert'),
    expect = require('expect.js'),
    Schema = require('../schemas').Schema,
    ArraySchema = require('../schemas').Array,
    schemas = require('../schemas').schemas;

describe('ObjectSchema', function () {
    describe('#1', function () {
        var schema = Schema({ a: Schema({ val: schemas.int.required() }).required(), b: schemas.date, c: schemas.string, d: [ArraySchema([{ b: schemas.int.required() }]).required()] });
        //console.log(schema);

        it('should parse as expected.', function () {
            assert.deepEqual({ a: { val: 1 }, b: new Date('2014-01-01'), c: 'abc', d: [[{b: 1}], [{b: 2}, {b: 3}]] }, schema.parse({ a: { val: '1' }, b: '2014-01-01', c: 'abc', d: [[{b: '1'}], [{b: '2'}, {b: '3'}]] }));
        });

        it('should throw error.', function () {
            expect(function () { schema.parse({ b: '2014-01-01', c: 'abc' }) }).to.throwError();
        });
    });

});

