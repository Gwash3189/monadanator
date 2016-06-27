import { nil, match, isAMonad, yes } from './helpers'

const isNotNil = (x) => (f) => nil(x) ? Maybe(x) : f(x)

const Maybe = (value) => {
  const notNil = isNotNil(value)

  const api = {
    value,
    of: (arg) => Maybe(arg),
    map: (func) => notNil(value => Maybe(func(value))),
    flatMap: (func) => notNil(value => Maybe(func(value).value)),
    ap: match(
        [nil, (x) => Maybe.of(x)],
        [isAMonad, (m) => m.map(value)],
        [yes, (v) => Maybe(v).map(value)]
      ),
    error: (f) => nil(value) ? f() : false
  }

  return api
}

Maybe.of = (x) => Maybe(x)

export default Maybe
