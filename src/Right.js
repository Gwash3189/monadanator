import { Container } from './Container'

const Right = (value) => {
  const api = Container(value)
  api.type = 'right'
}

export default Right
