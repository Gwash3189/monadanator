import { match, isAMonad, extract, yes } from './helpers'

const Container = (value) => {
  const api = {
    value,
    map: (func) => Container(func(value)),
    flatMap: (func) => Container(extract(func(value))),
    of: (arg) => Container(arg),
    ap: match(
        [isAMonad, (m) => m.map(value)],
        [yes, (v) => Container(v).map(value)]
      )
  }

  return api
}

Container.of = (x) => Container(x)

export default Container
