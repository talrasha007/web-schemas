var util = require('util'),
    _ = require('underscore'),
    cm = require('./common.js');

var IntSchema = exports.IntSchema = function () {
        cm.ComparableSchema.call(this);
    },
    NumberSchema = exports.NumberSchema = function () {
        cm.ComparableSchema.call(this);
    };

util.inherits(IntSchema, cm.ComparableSchema);
_.extend(IntSchema.prototype, {
    parse: function (str) {
        if (str === undefined) return ;
        var r = parseInt(str);
        if (!isNaN(r)) return r;
        throw new cm.SchemaParseError('Should be a int.');
    }
});

util.inherits(NumberSchema, cm.ComparableSchema);
_.extend(NumberSchema.prototype, {
    parse: function (str) {
        if (str === undefined) return ;
        var r = parseFloat(str);
        if (!isNaN(r)) return r;
        throw new cm.SchemaParseError('Should be a number.');
    }
});