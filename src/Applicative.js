import { extract } from './helpers'

const Applicative = (value) => {
  const api = {
    value,
    map: (func) => Applicative(func(value)),
    flatMap: (func) => Applicative(extract(func(value))),
    ap: (monad) => Applicative(value(extract(monad))),
    type: 'applicative'
  }

  return api
}

Applicative.of = (x) => Applicative(x)

export default Applicative
