const R = require('ramda')

const slider = R.curry((name, type) => {
  return (data) => {
    return { [name]: { [type]: +data } }
  }
})

const amp = slider('ampEnv')
const filter = slider('filterEnv')
const mixer = slider('mixer')

const handlers = {
  'keyboard:key_down': ({ text }) => {
    return { keyboard: { note: text } }
  },
  'keyboard:key_up': (_) => {
    return { keyboard: { note: null } }
  },
  'filterEnv:A': filter('A'),
  'filterEnv:D': filter('D'),
  'filterEnv:S': filter('S'),
  'filterEnv:R': filter('R'),
  'ampEnv:A': amp('A'),
  'ampEnv:D': amp('D'),
  'ampEnv:S': amp('S'),
  'ampEnv:R': amp('R'),
  'mixer:oscOne': mixer('oscOne'),
  'mixer:oscTwo': mixer('oscTwo'),
  'mixer:noise': mixer('noise'),
}

function handle({ type, data }) {
  const handler = handlers[type.join(':')]
  return handler ? handler(data) : data
}

export default handle;
