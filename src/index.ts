import copy from 'copy-anything'
import { isArray } from 'is-what'

const typeOrderMap = {
  boolean: 0,
  number: 1,
  string: 2,
  symbol: 3,
  object: 4,
  function: 5,
  null: 6,
  undefined: 7,
}

function compareAB (a, b, direction = 'asc') {
  if (direction === 'asc') {
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

/**
 * A function to pass to the native Array.proto.sort() function. Used to sort by a propname in an array of objects.
 *
 * @export
 * @param {string[][]} orderSets An array of arrays with a set of 2 strings: (1) the prop name to sort on and (2) 'asc' or 'desc'
 * @returns {function} to pass directly into sort(). Eg: sort(getSortFn([['prop', 'desc']]))
 */
function getSortFn (orderSets: string[][]) {
  return function (a: any, b: any) {
    function getCompareArray (payload: any, orderSets: string[][]) {
      return orderSets.map(set => {
        const value = payload[set[0]]
        const direction = set[1] || 'asc'
        const type = value === null ? 'null' : typeof value
        const typeAsNumber = typeOrderMap[type]
        return {
          value, direction, typeAsNumber
        }
      })
    }
    const compareArrayA = getCompareArray(a, orderSets)
    const compareArrayB = getCompareArray(b, orderSets)
    function recursivelyManageComparing (setA, setB, arrayA, arrayB) {
      const {
        typeAsNumber: typeAsNumberA,
        value: valueA,
        direction,
      } = setA
      const {
        typeAsNumber: typeAsNumberB,
        value: valueB,
      } = setB
      // different type:
      if (typeAsNumberA !== typeAsNumberB) {
        return compareAB(typeAsNumberA, typeAsNumberB, direction)
      }
      // same type, different value:
      if (valueA !== valueB) return compareAB(valueA, valueB, direction)
      // same type & value: go to the next iteration
      const nextSetA = arrayA.shift()
      const nextSetB = arrayB.shift()
      if (nextSetA === undefined || nextSetB === undefined) return 0
      return recursivelyManageComparing(nextSetA, nextSetB, arrayA, arrayB)
    }
    return recursivelyManageComparing(
      compareArrayA[0],
      compareArrayB[0],
      compareArrayA.slice(1),
      compareArrayB.slice(1)
    )
  }
}

class Sort {
  array: any[]
  constructor (array: any[]) {
    this.array = copy(array)
  }
  by (...args: (string[] | string[][])) {
    const { array } = this
    // @ts-ignore
    const orderSets: string[][] = !isArray(args[0]) ? [args] : args
    const sortFn = getSortFn(orderSets)
    array.sort(sortFn)
    return array
  }
}

const sort = (array: any[]) => new Sort(array)

export default sort
