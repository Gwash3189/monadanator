const Left = (value) => {
  const api = {
    value,
    map: (func) => Left(value),
    flatMap: (func) => Left(value),
    type: 'left'
  }

  return api
}

Left.of = (x) => Left(x)

export default Left
