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

  @action
  removeChallenger (challenger) {
    this.challengers = this.challengers.filter((c) => c !== challenger)
  }

  @action
  addChallenger (e) {
    e.preventDefault()
    const challenger = this.nextChallenger && this.nextChallenger.trim()
    if (!challenger) return
    this.challengers.pushObject(challenger)
    this.nextChallenger = undefined
    return false
  }

  @action
  createSession (e) {
    e.preventDefault()
    const players = this.sessionPlayers
    const session = this.session.create(players)
    return this.router.transitionTo('session', session)
  }
}
