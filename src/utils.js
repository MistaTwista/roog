const R = require('ramda')

export const makePath = (first, last) => R.flatten(R.prepend(first, last))
