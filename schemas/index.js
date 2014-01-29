var DateSchema = require('./dateSchema.js').DateSchema,
    IntSchema = require('./numberSchema.js').IntSchema,
    NumberSchema = require('./numberSchema.js').NumberSchema,
    StringSchema = require('./stringSchema.js').StringSchema;

exports.schemas = {
    int: new IntSchema(),
    number: new NumberSchema(),
    string: new StringSchema(),
    date: new DateSchema()
};
