const R = require('ramda')

export const makePath = (first, last) => R.flatten(R.prepend(first, last))
export const action = R.curry((path, val, obj) => {
  return R.over(R.lensPath(path), R.always(val))(obj)
})
