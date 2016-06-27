import { isAFunction, match, yes, identity, thunk } from './helpers'

const IO = (val) => {
  const value = match(
    [isAFunction, identity],
    [yes, thunk]
  )(val)

  const api = {
    get value () {
      return value()
    },
    perform: () => api.value,
    of: (x) => IO(x),
    map: (func) => IO(() => func(api.value)),
    flatMap: (func) => IO(() => func(api.value).value),
    ap: (container) => IO(() => value(container.value))
  }

  return api
}

export default IO
