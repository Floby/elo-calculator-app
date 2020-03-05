import Service from '@ember/service'

export default class LockService extends Service {
  constructor () {
    super(...arguments)
    this._locks = {}
  }

  async withLock(name, fn) {
    if (!this._locks[name]) {
      this._locks[name] = Lock()
    }
    await this._locks[name](async () => {
      await fn()
    })
  }
}


function Lock () {
  const pending = []
  let flushing = false
  return acquire

  function acquire (fn) {
    const deferred = new Deferred()
    const waiting = { deferred, fn }
    pending.push(waiting)
    setImmediate(flush)
    return deferred.promise
  }

  async function flush () {
    if (flushing) {
      return
    }
    const next = pending.shift()
    if (!next) {
      return
    }
    const { deferred, fn } = next
    flushing = true
    try {
      const result = await fn()
      deferred.resolve(result)
    } catch (e) {
      deferred.reject(e)
    }
    flushing = false
    setImmediate(flush)
  }
}


class Deferred {
  _resolve = noop
  _reject = noop
  _completed = false
  constructor () {
    this.promise = new Promise((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
    })
  }

  resolve (value) {
    this._completed = true
    this._fulfilled = value
    this._resolve(value)
  }
  reject (error) {
    this._completed = true
    this._rejected = error
    this._reject(error)
  }
  get completed () {
    return this._completed
  }
  get fulfilled () {
    return Boolean(this._completed && !this._rejected)
  }
  get resolved () {
    return this._fulfilled
  }
  get rejected () {
    return this._rejected
  }
}

function noop () { } // tslint:disable-line

function setImmediate (fn) {
  setTimeout(fn, 0)
}
