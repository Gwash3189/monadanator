# Monadanator

When you want to make things pure and functional.

# Usage

## Container

Basic container that both a functor and a monad. It responds to `map` and `flatMap`. In addition, it also responds to `of` and `ap`.

`of` describes a *pointed* monad where as `ap` describes an *applicative* monad.

### examples

```javascript
import { container } from 'monadanator'

container(3)
  .map(three => three * 2)
  .flatMap(six => container.of(2)
    .map(two => two * six)
  )
  .map(twelve => console.log(twelve))
```

```javascript

container
  .of(x => console.log(x))
  .ap('something that will get logged')
  .ap(container.of('another thing that will be logged'))
```


## IO
provides a function that acts just like container, but implements the expected IO Monad behaviour.

The only difference between an IO monad and a Container monad is that an IO monad waits to execute any calls to `map`, `flatMap` or `ap`. These calls will only be run when `perform` is called.

### examples

```javascript
import { io } from 'monadanator'

const helloWorld = io.of(window)
  .map(w => window.alert('hello world')) // no alert

helloWorld.perform() // alert's hello world
```

alternatively, you could use the `run` helper function

```javascript
import { io, helpers: { run } } from 'monadanator'

const helloWorld = io.of(window)
  .map(w => window.alert('hello world'));

const append = io.of(document)
  .map(doc => document.body.appendChild('hello!'))

run(
  helloWorld,
  append
) //alerts hello world & appends child

```

## Maybe

Maybe represents a point in your program where things could go wrong. It works exactly like a container, except when it receives a value of `undefined` or `null`. At which point, `map`, `flatMap` and `ap` will stop running.

There is also `error` method that will only run if the value contained within the Maybe monad is either `undefined` or `null`

### examples
``` javascript
import { maybe } from 'monadanator'
  maybe.of(true)
    .map(x => !x)
    .map(x => undefined) // everything past this point will never run
    .flatMap(x => maybe.of(3).map(x => * 2))
    .map(six => console.log(six))
    .error(_ => console.log('something went wrong')) // runs because the monad contains undefined

```
