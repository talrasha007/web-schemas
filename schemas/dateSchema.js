var util = require('util'),
    _ = require('underscore'),
    cm = require('./common.js');

var DateSchema = exports.DateSchema = function () {
        cm.ComparableSchema.call(this);
    };

util.inherits(DateSchema, cm.ComparableSchema);
_.extend(DateSchema.prototype, {
    parse: function (str) {
        if (str === undefined) return ;

        var r = Date.parse(str);
        if (!isNaN(r)) return new Date(r);

        r = new Date(str * 1);
        if (!isNaN(r.getTime())) return r;

        throw new cm.SchemaParseError('Should be a date.');
    }
});
