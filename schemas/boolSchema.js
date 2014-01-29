var util = require('util'),
    _ = require('underscore'),
    cm = require('./common.js');

var BoolSchema = exports.BoolSchema = function () {
    cm.SchemaBase.call(this);
};

util.inherits(BoolSchema, cm.SchemaBase);
_.extend(BoolSchema.prototype, {
    parse: function (str) {
        return str === 'true';
    }
});
