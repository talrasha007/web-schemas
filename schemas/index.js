var _ = require('underscore'),
    BoolSchema = require('./boolSchema.js').BoolSchema,
    DateSchema = require('./dateSchema.js').DateSchema,
    IntSchema = require('./numberSchema.js').IntSchema,
    NumberSchema = require('./numberSchema.js').NumberSchema,
    StringSchema = require('./stringSchema.js').StringSchema,
    ObjectSchema = require('./objectSchema.js').ObjectSchema,
    ArraySchema = require('./objectSchema.js').ArraySchema;

exports.schemas = {
    int: new IntSchema(),
    number: new NumberSchema(),
    bool: new BoolSchema(),
    string: new StringSchema(),
    date: new DateSchema()
};

exports.Schema = ObjectSchema;
exports.Array = ArraySchema;
