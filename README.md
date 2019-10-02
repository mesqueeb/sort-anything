# Sort anything 🗃 (WIP)

> !!! WIP !!!

```
npm i sort-anything
```

Sort arrays in a functional programming way. A simple & small integration.

## Motivation

I wanted to create a way to sort arrays that's close to "functional programming" and has a TINY footprint!

## Meet the family

- [merge-anything 🥡](https://github.com/mesqueeb/merge-anything)
- [filter-anything ⚔️](https://github.com/mesqueeb/filter-anything)
- [find-and-replace-anything 🎣](https://github.com/mesqueeb/find-and-replace-anything)
- [compare-anything 🛰](https://github.com/mesqueeb/compare-anything)
- [copy-anything 🎭](https://github.com/mesqueeb/copy-anything)
- [flatten-anything 🏏](https://github.com/mesqueeb/flatten-anything)
- [is-what 🙉](https://github.com/mesqueeb/is-what)

## Usage

```js
import sort from 'sort-anything'

const array = [{id: 3}, {id: 1}, {id: 2}]

sort(array).by('id', 'asc')
  === [{id: 1}, {id: 2}, {id: 3}]
```
