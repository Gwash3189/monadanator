import { extract } from './helpers'

const Container = (value) => {
  const api = {
    value,
    map: (func) => Container(func(value)),
    flatMap: (func) => Container(extract(func(value))),
    type: 'container'
  }

  return api
}

Container.of = (x) => Container(x)

export default Container
