import { expect } from 'chai'
import { spy } from 'sinon'

import Maybe from '../src/Maybe'

describe('Maybe', function () {
  let maybe,
    mapSpy

  beforeEach(() => {
    mapSpy = spy()
    maybe = Maybe(3)
  })

  it('contains the value', function () {
    expect(maybe.value)
      .to.eql(3)
  })

  it('maps the value', function () {
    expect(maybe.map(x => x + 3).value)
      .to.eql(6)
  })

  it('unwraps the double Maybe', function () {
    expect(maybe.flatMap(x => Maybe(x + 3)).value)
      .to.eql(6)
  })

  it('does not call the spy if it is given null or undefined', () => {
    Maybe(null).map(mapSpy)

    expect(mapSpy.called)
      .to.not.be.true
  })

  it('does calls the error spy if it is given null or undefined', () => {
    Maybe(undefined).error(mapSpy)

    expect(mapSpy.called)
      .to.be.true
  })

  it('applies a monad to a stored function', function () {
    const may = Maybe((x) => x)
    expect(may.ap(Maybe(true)).value)
      .to.be.true
  })

  it('applies a value to a stored function', function () {
    const may = Maybe((x) => x)
    expect(may.ap(true).value)
      .to.be.true
  })

  it('handles thrown errors', function () {
    const err = new Error('no!')
    const may = Maybe(true)

    expect(may.map((x) => x).map(x => { throw err }).flatMap(x => Maybe(3)).value)
      .to.eql(err)
  })
})
