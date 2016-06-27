import { expect } from 'chai'

import Container from '../src/Container'

describe('Container', function () {
  let container

  beforeEach(() => {
    container = Container(3)
  })

  it('contains the value', function () {
    expect(container.value)
      .to.eql(3)
  })

  it('maps the value', function () {
    expect(container.map(x => x + 3).value)
      .to.eql(6)
  })

  it('maps the value', function () {
    expect(container.map(x => x + 3).value)
      .to.eql(6)
  })

  it('unwraps the double container', function () {
    expect(container.flatMap(x => Container(x + 3)).value)
      .to.eql(6)
  })

  it('applies a monad to a stored function', function () {
    const cont = Container((x) => x)
    expect(cont.ap(container.of(true)))
      .to.be.ok
  })

  it('applies a value to a stored function', function () {
    const cont = Container((x) => x)
    expect(cont.ap(true))
      .to.be.ok
  })
})
