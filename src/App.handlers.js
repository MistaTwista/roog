const R = require('ramda')

const getType = R.prop('type')

const handlers = {
  'KEYBOARD:KEY_DOWN': ({ data }) => {
    const note = R.prop('text', data)
    return { keyboard: { note } }
  },
  'KEYBOARD:KEY_UP': (_) => {
    return { keyboard: { note: null } }
  }
}

function handle({ state, data }) {
  const eventType = getType(data)
  const modState = handlers[eventType](data)
  return R.merge(state, modState)
}

export default handle;
