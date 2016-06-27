import { nil } from './helpers'

const isNotNil = (x) => (f) => nil(x) ? Maybe(x) : f(x)

const Maybe = (value) => {
  const notNil = isNotNil(value)

  const api = {
    value,
    of: (arg) => Maybe(arg),
    map: (func) => notNil(value => Maybe(func(value))),
    flatMap: (func) => notNil(value => Maybe(func(value).value)),
    ap: (container) => notNil(value => Maybe(value(container.value))),
    error: (f) => nil(value) ? f() : false
  }

  return api
}

export default Maybe
