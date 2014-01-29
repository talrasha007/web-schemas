var util = require('util'),
    _ = require('underscore'),
    cm = require('./common.js');

var StringSchema = exports.StringSchema = function () {
    cm.SchemaBase.call(this);
};

util.inherits(StringSchema, cm.ComparableSchema);
_.extend(StringSchema.prototype, {
    parse: function (str) {
        return str;
    },

    notEmpty: function () {
        return this._sealParser(function (v) {
            if (v) return v;
            throw new cm.SchemaParseError('cannot be empty.');
        });
    },
    isAlpha: function () {
        return this.is(/^[a-zA-Z]+$/);
    },
    isAlphanumeric: function () {
        return this.is(/^[a-zA-Z0-9]+$/);
    },
    isNumeric: function () {
        return this.is(/^-?[0-9]+$/);
    },
    isHex: function () {
        return this.is(/^[0-9a-fA-F]+$/);
    },
    isHexColor: function () {
        return this.is(/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);
    },

    toLowerCase: function () {
        return this._sealParser(function (v) {
            return v && v.toLowerCase();
        });
    },
    toUpperCase: function () {
        return this._sealParser(function (v) {
            return v && v.toUpperCase();
        });
    },
    isLowerCase: function () {
        return this._sealParser(function (v) {
            if (v === v.toLowerCase()) return v;
            throw new cm.SchemaParseError('should be lowercase.');
        });
    },
    isUpperCase: function () {
        return this._sealParser(function (v) {
            if (v === v.toUpperCase()) return v;
            throw new cm.SchemaParseError('should be uppercase.');
        });
    },

    isUUID: function () {
        return this._sealParser(function (v) {
            if (v === undefined) return ;

            if (/^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i.test(v) ||
                /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(v) ||
                /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(v) ||
                /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i.test(v))
                return v;

            throw new cm.SchemaParseError('should be a uuid.');
        });
    },
    isUUIDv3: function () {
        return this.is(/^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i);
    },
    isUUIDv4: function () {
        return this.is(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    },
    isUUIDv5: function () {
        return this.is(/^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    },

    isMd5: function () {
        return this.is(/^[0-9a-fA-F]{32}$/);
    },
    isObjectId : function () {
        return this.is(/^[0-9a-fA-F]{24}$/);
    },
    isEmail: function () {
        return this.is(/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/);
    },
    isUrl: function () {
        return this.is(/^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i);
    },
    isIPv4: function () {
        return this._sealParser(function (v) {
            if (/^(\d?\d?\d)\.(\d?\d?\d)\.(\d?\d?\d)\.(\d?\d?\d)$/.test(v)) {
                var parts = str.split('.').sort();
                if (_.every(parts, function (p) { return p < 255; }) && parts[1] > 0 && parts[3] > 0) return v;
            }
            throw new cm.SchemaParseError('should be a ip address.');
        });
    },
    isIPv6: function () {
        return this.is(/^::|^::1|^([a-fA-F0-9]{1,4}::?){1,7}([a-fA-F0-9]{1,4})$/);
    },


    len: function (min, max) {
        return this._sealParser(function (v) {
            if (v === undefined) return ;
            if (v.length >= (min || 0) && (max === undefined || v.length <= max)) return v;
            throw new cm.SchemaParseError('string length error.');
        });
    },
    is: function (pattern) {
        return this._sealParser(function (v) {
            if (v === undefined || pattern.test(v)) return v;
            throw new cm.SchemaParseError('string format error.');
        });
    },
    not: function (pattern) {
        return this._sealParser(function (v) {
            if (v === undefined || !pattern.test(v)) return v;
            throw new cm.SchemaParseError('string format error.');
        });
    },
    contains: function (val) {
        return this._sealParser(function (v) {
            if (v === undefined || v.indexOf(val) >= 0) return v;
            throw new cm.SchemaParseError('string format error.');
        });
    },
    notContains: function (val) {
        return this._sealParser(function (v) {
            if (v === undefined || v.indexOf(val) < 0) return v;
            throw new cm.SchemaParseError('string format error.');
        });
    }
});
