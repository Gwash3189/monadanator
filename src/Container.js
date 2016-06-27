import { match, isAMonad, yes } from './helpers'

const Container = (value) => {
  const api = {
    value,
    of: (arg) => Container(arg),
    map: (func) => Container(func(value)),
    flatMap: (func) => Container(func(value).value),
    ap: match(
        [isAMonad, (m) => m.map(value)],
        [yes, (v) => Container(v).map(value)]
      )
  }

  return api
}

export default Container
