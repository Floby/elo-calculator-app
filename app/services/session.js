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

  save (session) {
    if (!this.store.has(session.id)) {
      throw Error('Session must already exist')
    }
    this.store.set(session.id, session)
  }

  get (id) {
    const json = this.store.get(id)
    const { players, winners } = json
    return new Session ({ id, players, winners })
  }
}

class Session {
  id = null
  players = []
  winners = []
  constructor ({ id, players, winners }) {
    this.id = id
    this.players = [...players]
    this.winners = winners || []
  }

  addWinner (winner) {
    if (!this.players.includes(winner)) {
      throw Error('Winner must be amongst players')
    }
    this.winners.push(winner)
  }
}
