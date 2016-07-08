import { nil, match, extract, isAMonad, yes, isAnError } from './helpers'

const acceptableValue = (x) => !nil(x) && !isAnError(x)
const handle = (f, onError) => (x) => {
  try {
    return f(x)
  } catch (e) {
    return onError(e)
  }
}
const Maybe = (value) => {
  const api = {
    value,
    of: (arg) => Maybe(arg),
    map: handle((func) => acceptableValue(value)
        ? Maybe(func(value))
        : Maybe(value), Maybe),
    flatMap: handle((func) => acceptableValue(value)
        ? Maybe(extract(func(value)))
        : Maybe(value), Maybe),
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
