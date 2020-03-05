import { tracked } from '@glimmer/tracking'
import Controller from '@ember/controller'
import { action, computed } from '@ember/object'
import { inject as service } from '@ember/service'
import { A } from '@ember/array'

export default class NewSessionController extends Controller {
  @service session
  @service router
  @tracked model
  @tracked ladderPlayersSelection
  @tracked challengers = []
  @tracked nextChallenger
  @tracked error

  initialize () {
    this.challengers = A([])
    this.ladderPlayersSelection = A(this.model.map((name) => {
      return { name, selected: false }
    }))
  }

  @computed('challengers.@each', 'ladderPlayersSelection.@each.selected')
  get sessionPlayers () {
    return this.ladderPlayersSelection
      .filter((p) => p.selected)
      .map(({ name }) => name)
      .concat(this.challengers)
  }

  get sessionPlayerList () {
    const names = [...this.sessionPlayers]
    names.reverse()
    const [last, ...others] = names
    if (!others.length) return ''
    others.reverse()
    return `${others.join(', ')} and ${last}`
  }

  get readyToFight () {
    return this.sessionPlayers.length >= 2 && !this.hasError
  }

  get hasError () {
    return Boolean(this.error)
  }

  checkAlreadyPresent (name) {
    if (this.model.some((player) => name === player)) {
      throw Error(`"${name}" already exists. Choose another name`)
    }
    if (this.challengers.some((player) => name === player)) {
      throw Error(`"${name}" already exists. Choose another name`)
    }
  }

  @action
  removeChallenger (challenger) {
    this.challengers = this.challengers.filter((c) => c !== challenger)
  }

  @action
  addChallenger (e) {
    e.preventDefault()
    const challenger = this.nextChallenger && this.nextChallenger.trim()
    if (!challenger) return
    try {
      this.checkAlreadyPresent(challenger)
      this.challengers.pushObject(challenger)
      this.nextChallenger = undefined
    } catch (e) {
      this.error = e.message
    }
  }

  @action
  createSession (e) {
    e.preventDefault()
    const players = this.sessionPlayers
    const session = this.session.create(players)
    return this.router.transitionTo('session', session)
  }

  @action
  getPastError () {
    this.error = undefined
  }
}
