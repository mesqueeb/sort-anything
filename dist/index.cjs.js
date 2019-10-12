'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var copy = _interopDefault(require('copy-anything'));

var typeOrder = {
    boolean: 0,
    number: 1,
    string: 2,
    symbol: 3,
    "null": 4,
    undefined: 5,
    "function": 6,
    object: 7,
};
/**
 * A function to pass to the native Array.proto.sort() function. Used to sort by a propname in an array of objects.
 *
 * @export
 * @param {string} propName The prop name to sort by
 * @param {string} [direction='asc'] 'asc' or 'desc'
 * @returns {function} to pass directly into sort(). Eg: sort(sortBy('prop'))
 */
function sortByFn(propName, direction) {
    if (direction === void 0) { direction = 'asc'; }
    return function (a, b) {
        a = a[propName];
        b = b[propName];
        var typeA = (a === null) ? 'null' : typeof a;
        var typeB = (b === null) ? 'null' : typeof b;
        if (typeA !== typeB) {
            a = typeOrder[typeA];
            b = typeOrder[typeB];
        }
        if (direction === 'asc') {
            return (a > b)
                ? 1
                : ((b > a)
                    ? -1
                    : 0);
        }
        return (a < b)
            ? 1
            : ((b < a)
                ? -1
                : 0);
    };
}
var Sort = /** @class */ (function () {
    function Sort(array) {
        this.array = copy(array);
    }
    Sort.prototype.by = function (prop, direction) {
        if (direction === void 0) { direction = 'asc'; }
        var target = this.array;
        target.sort(sortByFn(prop, direction));
        return target;
    };
    return Sort;
}());
var sort = function (array) { return new Sort(array); };

module.exports = sort;
