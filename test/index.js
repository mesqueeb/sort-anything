import test from 'ava'
import sort from '../dist/index.cjs'

test('t', t => {
  const array = [{id: 3}, {id: 1}, {id: 2}]
  const res = sort(array).by('id', 'asc')
  t.deepEqual(res, [
    {id: 1}, {id: 2}, {id: 3}
  ])
})
