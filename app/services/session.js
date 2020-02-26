import { v4 as uuid } from 'uuid'
import Store from 'store2'
import Service from '@ember/service'

export default class SessionService extends Service {
  constructor () {
    super(...arguments)
    this.store = Store.namespace('sessions')
  }

  create (players) {
    const id = uuid()
    const session = new Session ({ id, players })
    this.store.set(id, session)
    return session
  }

  get (id) {
    const json = this.store.get(id)
    const { players } = json
    return new Session ({ id, players })
  }
}

class Session {
  id = null
  players = []
  constructor ({ id, players }) {
    this.id = id
    this.players = [...players]
  }
}
