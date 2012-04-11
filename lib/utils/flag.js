/*!
 * Chai - flag utility
 * Copyright(c) 2012 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * # flag(key, [value])
 *
 * Get or set a flag value on an object. If a
 * value is provided it will be set, else it will
 * return the currently set value or `undefined` if
 * the value is not set.
 *
 * @param {String} key
 * @param {Mixed} value (optional)
 * @api private
 */

module.exports = function (obj, key, value) {
  var flags = obj.__flags || (obj.__flags = new Object(null));
  if (arguments.length === 3) {
    flags[key] = value;
    return value;
  } else {
    return flags[key];
  }
}