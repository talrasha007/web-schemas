var _ = require('underscore'),
    BoolSchema = require('./boolSchema.js').BoolSchema,
    DateSchema = require('./dateSchema.js').DateSchema,
    IntSchema = require('./numberSchema.js').IntSchema,
    NumberSchema = require('./numberSchema.js').NumberSchema,
    StringSchema = require('./stringSchema.js').StringSchema,
    ObjectSchema = require('./objectSchema.js').ObjectSchema,
    ArraySchema = require('./objectSchema.js').ArraySchema;

var exp = module.exports = ObjectSchema;

_.extend(exp, {
    Array: ArraySchema,
    int: new IntSchema(),
    number: new NumberSchema(),
    bool: new BoolSchema(),
    string: new StringSchema(),
    date: new DateSchema()
});
