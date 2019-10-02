import test from 'ava'
import sort from '../dist/index.cjs'

test('t', t => {
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
  array = [{id: 1}, {id: undefined}, {id: true}, {id: 'a'}, {id: undefined}]
  res = sort(array).by('id', 'asc')
  t.deepEqual(res, [
    {id: 1},
    {id: 'a'},
    {id: true},
    {id: undefined},
    {id: undefined},
  ])
  array = [{id: 'modified'}, {id: undefined}, {id: true}]
  res = sort(array).by('id', 'asc')
  t.deepEqual(res, [
    {id: 'modified'},
    {id: true},
    {id: undefined},
  ])
})
