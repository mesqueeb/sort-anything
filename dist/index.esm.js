import copy from 'copy-anything';
import { isArray } from 'is-what';

var typeOrderMap = {
    boolean: 0,
    number: 1,
    string: 2,
    symbol: 3,
    object: 4,
    "function": 5,
    "null": 6,
    undefined: 7,
};
function compareAB(a, b, direction) {
    if (direction === void 0) { direction = 'asc'; }
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
}
/**
 * A function to pass to the native Array.proto.sort() function. Used to sort by a propname in an array of objects.
 *
 * @export
 * @param {string[][]} orderSets An array of arrays with a set of 2 strings: (1) the prop name to sort on and (2) 'asc' or 'desc'
 * @returns {function} to pass directly into sort(). Eg: sort(getSortFn([['prop', 'desc']]))
 */
function getSortFn(orderSets) {
    return function (a, b) {
        function getCompareArray(payload, orderSets) {
            return orderSets.map(function (set) {
                var value = payload[set[0]];
                var direction = set[1] || 'asc';
                var type = value === null ? 'null' : typeof value;
                var typeAsNumber = typeOrderMap[type];
                return {
                    value: value, direction: direction, typeAsNumber: typeAsNumber
                };
            });
        }
        var compareArrayA = getCompareArray(a, orderSets);
        var compareArrayB = getCompareArray(b, orderSets);
        function recursivelyManageComparing(setA, setB, arrayA, arrayB) {
            var typeAsNumberA = setA.typeAsNumber, valueA = setA.value, direction = setA.direction;
            var typeAsNumberB = setB.typeAsNumber, valueB = setB.value;
            // different type:
            if (typeAsNumberA !== typeAsNumberB) {
                return compareAB(typeAsNumberA, typeAsNumberB, direction);
            }
            // same type, different value:
            if (valueA !== valueB)
                return compareAB(valueA, valueB, direction);
            // same type & value: go to the next iteration
            var nextSetA = arrayA.shift();
            var nextSetB = arrayB.shift();
            if (nextSetA === undefined || nextSetB === undefined)
                return 0;
            return recursivelyManageComparing(nextSetA, nextSetB, arrayA, arrayB);
        }
        return recursivelyManageComparing(compareArrayA[0], compareArrayB[0], compareArrayA.slice(1), compareArrayB.slice(1));
    };
}
var Sort = /** @class */ (function () {
    function Sort(array) {
        this.array = copy(array);
    }
    Sort.prototype.by = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var array = this.array;
        // @ts-ignore
        var orderSets = !isArray(args[0]) ? [args] : args;
        var sortFn = getSortFn(orderSets);
        array.sort(sortFn);
        return array;
    };
    return Sort;
}());
var sort = function (array) { return new Sort(array); };

export default sort;
