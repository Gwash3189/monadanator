export function thunk (x) {
  return () => x
}

export const call = (verb, ...firstArgs) => (...secondArgs) => (app) => {
  app[verb](...firstArgs.concat(secondArgs))
  return app
}

export const pluck = (path) => (x) => x[path]

export const isAMonad = (m) => !!(pluck('map')(m) && pluck('flatMap')(m))
export const nil = (x) => x === null || x === undefined
export const isA = (str) => (x) => typeof x === str
export const isAFunction = isA('function')
export const isAString = isA('string')
export const perform = call('perform')()
export const run = (...ios) => ios.forEach(perform)
export const repeat = (io) => ({
  every: (time) => io.map(() => setInterval(() => run(io), time))
})
export const identity = (x) => x
export const yes = thunk(true)
export const first = pluck('0')
export const second = pluck('1')
export const each = (arr, fs) => {
  for (var i = 0; i < arr.length; i++) {
    const returnValue = fs(arr[i], i, arr)
    if (returnValue !== undefined) {
      return returnValue
    }
  }
}
export const match = (...tuples) => {
  return (...xs) => {
    return each(tuples, (tuple, i) => {
      if (first(tuples[i])(...xs)) {
        return second(tuples[i])(...xs)
      }
    })
  }
}
