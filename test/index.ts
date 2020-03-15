import test from 'ava'
import { sort } from '../src/index'

// const typeOrder = {
//   boolean: 0,
//   number: 1,
//   string: 2,
//   symbol: 3,
//   null: 4,
//   undefined: 5,
//   function: 6,
//   object: 7,
// }

test('mixed type sort 1', t => {
  const array = [{ id: 1 }, { id: undefined }, { id: true }, { id: 'a' }, { id: undefined }]
  const res = sort(array).by('id', 'asc')
  t.deepEqual(res, [{ id: true }, { id: 1 }, { id: 'a' }, { id: undefined }, { id: undefined }])
})
test('mixed type sort 2', t => {
  const array = [{ id: 'modified' }, { id: undefined }, { id: true }]
  const res = sort(array).by('id', 'asc')
  t.deepEqual(res, [{ id: true }, { id: 'modified' }, { id: undefined }])
})
test('all types sort', t => {
  // all types
  const object = {}
  const symbol = Symbol('s')
  const fn = () => {}
  const array = [
    { id: undefined },
    { id: null },
    { id: 'string' },
    { id: object },
    { id: false },
    { id: symbol },
    { id: 0 },
    { id: fn },
  ]
  const res = sort(array).by('id', 'asc')
  t.deepEqual(res, [
    { id: false },
    { id: 0 },
    { id: 'string' },
    { id: symbol },
    { id: object },
    { id: fn },
    { id: null },
    { id: undefined },
  ])
})

test('regular ordering of single types', t => {
  let array, res
  array = [{ id: 'c' }, { id: 'a' }, { id: 'b' }]
  res = sort(array).by('id', 'asc')
  t.deepEqual(res, [{ id: 'a' }, { id: 'b' }, { id: 'c' }])
  res = sort(array).by('id', 'desc')
  t.deepEqual(res, [{ id: 'c' }, { id: 'b' }, { id: 'a' }])
  array = [{ id: 3 }, { id: 1 }, { id: 2 }]
  res = sort(array).by('id', 'asc')
  t.deepEqual(res, [{ id: 1 }, { id: 2 }, { id: 3 }])
  res = sort(array).by('id', 'desc')
  t.deepEqual(res, [{ id: 3 }, { id: 2 }, { id: 1 }])
  array = [{ id: false }, { id: true }, { id: false }]
  res = sort(array).by('id', 'asc')
  t.deepEqual(res, [{ id: false }, { id: false }, { id: true }])
  res = sort(array).by('id', 'desc')
  t.deepEqual(res, [{ id: true }, { id: false }, { id: false }])
})

test('strings and dates', t => {
  let array, res
  const d2000 = new Date('2000/01/01')
  const d2001 = new Date('2001/01/01')
  const d2002 = new Date('2002/01/01')
  array = [{ id: d2002 }, { id: d2000 }, { id: d2001 }]
  res = sort(array).by('id', 'asc')
  t.deepEqual(res, [{ id: d2000 }, { id: d2001 }, { id: d2002 }])
  res = sort(array).by('id', 'desc')
  t.deepEqual(res, [{ id: d2002 }, { id: d2001 }, { id: d2000 }])
  // with strings
  array = [{ id: d2002 }, { id: '2003/01/01' }, { id: d2000 }, { id: '1999/01/01' }, { id: d2001 }]
  res = sort(array).by('id', 'asc')
  t.deepEqual(res, [
    { id: '1999/01/01' },
    { id: '2003/01/01' },
    { id: d2000 },
    { id: d2001 },
    { id: d2002 },
  ])
})

test('double sorting!!!', t => {
  let array, res
  array = [
    { id: 'c', nr: 1 },
    { id: 'c', nr: 3 },
    { id: 'c', nr: 2 },
    { id: 'b', nr: 2 },
    { id: 'b', nr: 3 },
    { id: 'a', nr: 0 },
    { id: 'a', nr: 1 },
  ]
  res = sort(array).by(['id', 'asc'], ['nr', 'desc'])
  t.deepEqual(res, [
    { id: 'a', nr: 1 },
    { id: 'a', nr: 0 },
    { id: 'b', nr: 3 },
    { id: 'b', nr: 2 },
    { id: 'c', nr: 3 },
    { id: 'c', nr: 2 },
    { id: 'c', nr: 1 },
  ])
  res = sort(array).by(['id', 'desc'], ['nr', 'desc'])
  t.deepEqual(res, [
    { id: 'c', nr: 3 },
    { id: 'c', nr: 2 },
    { id: 'c', nr: 1 },
    { id: 'b', nr: 3 },
    { id: 'b', nr: 2 },
    { id: 'a', nr: 1 },
    { id: 'a', nr: 0 },
  ])
  res = sort(array).by(['id', 'asc'], ['nr', 'asc'])
  t.deepEqual(res, [
    { id: 'a', nr: 0 },
    { id: 'a', nr: 1 },
    { id: 'b', nr: 2 },
    { id: 'b', nr: 3 },
    { id: 'c', nr: 1 },
    { id: 'c', nr: 2 },
    { id: 'c', nr: 3 },
  ])
  res = sort(array).by(['id', 'desc'], ['nr', 'asc'])
  t.deepEqual(res, [
    { id: 'c', nr: 1 },
    { id: 'c', nr: 2 },
    { id: 'c', nr: 3 },
    { id: 'b', nr: 2 },
    { id: 'b', nr: 3 },
    { id: 'a', nr: 0 },
    { id: 'a', nr: 1 },
  ])
})
