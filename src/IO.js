import { isAFunction, match, extract, yes, identity, thunk } from './helpers'

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
    map: (func) => IO(() => func(api.value)),
    flatMap: (func) => IO(() => extract(func(api.value))),
    type: 'io'
  }

  return api
}

IO.of = (x) => IO(x)

export default IO
