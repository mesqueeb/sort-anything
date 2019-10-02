import copy from 'copy-anything'

/**
 * A function to pass to the native Array.proto.sort() function. Used to sort by a propname in an array of objects.
 *
 * @export
 * @param {string} propName The prop name to sort by
 * @param {string} [direction='asc'] 'asc' or 'desc'
 * @returns {function} to pass directly into sort(). Eg: sort(sortBy('prop'))
 */
function sortByFn (propName, direction = 'asc') {
  return function (a, b) {
    a = a[propName]
    b = b[propName]
    if (direction === 'asc' || !direction) {
      return (a > b)
        ? 1
        : ((b > a)
          ? -1
          : 0)
    }
    return (a < b)
      ? 1
      : ((b < a)
        ? -1
        : 0)
  }
}

class Sort {
  array
  constructor (array) {
    this.array = copy(array)
  }
  by (prop, direction = 'asc') {
    const target = this.array
    target.sort(sortByFn(prop, direction))
    return target
  }
}

const sort = array => new Sort(array)

export default sort
