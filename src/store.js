const R = require('ramda')
const K = require('kefir')

const initialState = {
  filterEnv: { A: 0, D: 64, S: 64, R: 127 },
  ampEnv: { A: 0, D: 64, S: 64, R: 127 },
  mixer: {
    oscOne: 0,
    oscTwo: 0,
    noise: 0
  },
  keyboard: {
    note: null
  }
}

function StateStore(actions$) {
  return actions$
    .scan((state, fn) => {
      if (!R.is(Function, fn)) {
        throw Error(`dispatched value must be function, got ${typeof fn}`)
      }

      return fn(state)
    }, null)
    .skipDuplicates()
}

function pool() {
  const pool = K.pool()
  const _plug = pool.plug.bind(pool)
  pool.plug = function (x) {
    if (x instanceof K.Property || x instanceof K.Stream || x instanceof K.Observable) {
      _plug(x)
    } else {
      _plug(K.constant(x))
    }
  }
  return pool
}

export const actions$ = pool()

export const state$ = StateStore(
  K.merge([
    K.constant(() => initialState),
    actions$,
  ])
)
