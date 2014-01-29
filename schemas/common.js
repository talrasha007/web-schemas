var _ = require('underscore'),
    util = require('util');

var SchemaParseError = exports.SchemaParseError = function (msg, path) {
        Error.call(this, msg);
        this.name = 'SchemaParseError';
        this.message = msg;
        this.path = path || '';
    },
    SchemaBase = exports.SchemaBase = function () {
    },
    ComparableSchema = exports.ComparableSchema = function () {
        SchemaBase.call(this);
    };

util.inherits(SchemaParseError, Error);

SchemaBase.prototype = {
    required: function () {
        return this._sealParser(function (v) {
            if (v !== undefined && v !== null) return v;
            throw new SchemaParseError('required.');
        });
    },

    default: function (val) {
        return this._sealParser(function (v) {
            return v === undefined || v === null ? val : v;
        });
    },

    isIn: function (arr) {
        return this._sealParser(function (v) {
            if (v === undefined) return ;
            if (arr.indexOf(v) >= 0) return v;
            throw new SchemaParseError('wrong value.');
        });
    },

    notIn: function (arr) {
        return this._sealParser(function (v) {
            if (v === undefined) return ;
            if (arr.indexOf(v) < 0) return v;
            throw new SchemaParseError('wrong value.');
        });
    },

    _sealParser: function (fn) {
        var me = new this.constructor(this),
            oldParser = this.parse;

        me.parse = function (str) {
            var val = oldParser.call(me, str);
            return fn.call(me, val);
        };

        return me;
    }
};

util.inherits(ComparableSchema, SchemaBase);
_.extend(ComparableSchema.prototype, {
    gt: function (val) {
        return this._sealParser(function (v) {
            if (v === undefined) return ;
            if (v > val) return v;
            throw new SchemaParseError('Value should be greater than ' + val + '.');
        });
    },
    lt: function (val) {
        return this._sealParser(function (v) {
            if (v === undefined) return ;
            if (v < val) return v;
            throw new SchemaParseError('Value should be less than ' + val + '.');
        });
    },
    gte: function (val) {
        return this._sealParser(function (v) {
            if (v === undefined) return ;
            if (v >= val) return v;
            throw new SchemaParseError('Value should be equal or greater than ' + val + '.');
        });
    },
    lte: function (val) {
        return this._sealParser(function (v) {
            if (v === undefined) return ;
            if (v <= val) return v;
            throw new SchemaParseError('Value should be equal or less than ' + val + '.');
        });
    }
});
