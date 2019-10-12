import test from 'ava'
import sort from '../dist/index.cjs'

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

test('mixed type sort', t => {
  let array, res
  array = [{id: 1}, {id: undefined}, {id: true}, {id: 'a'}, {id: undefined}]
  res = sort(array).by('id', 'asc')
  t.deepEqual(res, [
    {id: true},
    {id: 1},
    {id: 'a'},
    {id: undefined},
    {id: undefined},
  ])
  array = [{id: 'modified'}, {id: undefined}, {id: true}]
  res = sort(array).by('id', 'asc')
  t.deepEqual(res, [
    {id: true},
    {id: 'modified'},
    {id: undefined},
  ])
})

test('regular ordering of single types', t => {
  let array, res
  array = [{id: 'c'}, {id: 'a'}, {id: 'b'}]
  res = sort(array).by('id', 'asc')
  t.deepEqual(res, [
    {id: 'a'},
    {id: 'b'},
    {id: 'c'},
  ])
  res = sort(array).by('id', 'desc')
  t.deepEqual(res, [
    {id: 'c'},
    {id: 'b'},
    {id: 'a'},
  ])
  array = [{id: 3}, {id: 1}, {id: 2}]
  res = sort(array).by('id', 'asc')
  t.deepEqual(res, [
    {id: 1},
    {id: 2},
    {id: 3},
  ])
  res = sort(array).by('id', 'desc')
  t.deepEqual(res, [
    {id: 3},
    {id: 2},
    {id: 1},
  ])
  array = [{id: false}, {id: true}, {id: false}]
  res = sort(array).by('id', 'asc')
  t.deepEqual(res, [
    {id: false},
    {id: true},
    {id: true},
  ])
  res = sort(array).by('id', 'asc')
  t.deepEqual(res, [
    {id: true},
    {id: true},
    {id: false},
  ])
})
