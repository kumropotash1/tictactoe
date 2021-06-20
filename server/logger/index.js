"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.info = exports.debug = void 0;
var lpad = function (val, length, char) {
    val = String(val);
    if (length <= 0) {
        throw new Error('Expected length to be >= 0');
    }
    char = char || '0';
    if ((char === null || char === void 0 ? void 0 : char.length) > 1) {
        throw new Error('Expected a character, received a string');
    }
    return char.repeat(Math.max(length - val.length, 0)) + val;
};
var formatLogTime = function (time) {
    time = time || new Date();
    return time.getFullYear() + "-" + lpad(time.getMonth(), 2) + "-" + lpad(time.getDate(), 2) + " " + lpad(time.getHours(), 2) + ":" + lpad(time.getMinutes(), 2) + ":" + lpad(time.getSeconds(), 2) + "." + lpad(time.getMilliseconds(), 3);
};
var prepareLog = function (sourceTag, message) {
    return formatLogTime() + "  - [ " + sourceTag + " ] - " + message;
};
var debug = function (sourceTag, message) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    console.debug.apply(console, __spreadArray([prepareLog(sourceTag, message)], args));
};
exports.debug = debug;
var info = function (sourceTag, message) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    console.info.apply(console, __spreadArray([prepareLog(sourceTag, message)], args));
};
exports.info = info;
var error = function (sourceTag, message) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    console.error.apply(console, __spreadArray([prepareLog(sourceTag, message)], args));
};
exports.error = error;
exports.default = { debug: exports.debug, info: exports.info, error: exports.error };
