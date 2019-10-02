import copy from 'copy-anything';

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
        if (a === undefined)
            a = '𐀿'; // last unicode char?
        if (b === undefined)
            b = '𐀿'; // last unicode char?
        a = String(a);
        b = String(b);
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

export default sort;
